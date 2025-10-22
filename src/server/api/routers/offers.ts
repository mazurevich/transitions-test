import type { Offer, OfferImage, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const inputSchema = z.object({
	search: z.string().optional(),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(10),
});

const offerSharedInclude: Prisma.OfferInclude = {
	OfferImage: {
		select: {
			id: true,
			imageUrl: true,
			title: true,
		},
	},
};

type OfferWithReviewCount = Offer & {
	reviewsCount: number;
	rating: number;
	OfferImage: Pick<OfferImage, "id" | "imageUrl" | "title">[];
};

export const offersRouter = createTRPCRouter({
	getOffers: publicProcedure
		.input(inputSchema)
		.query(async ({ ctx, input }): Promise<OfferWithReviewCount[]> => {
			// First request: Get the required offers
			const offers = await ctx.db.offer.findMany({
				where: {
					OR: [
						{ title: { contains: input.search } },
						{ description: { contains: input.search } },
					],
					isActive: true,
				},
				include: offerSharedInclude,
				skip: (input.page - 1) * input.limit,
				take: input.limit,
				orderBy: {
					createdAt: "desc",
				},
			});

			// Extract offer IDs for the second request
			const offerIds = offers.map((offer) => offer.id);

			// Second request: Calculate average rating and count for all required offers
			const reviewStats = await ctx.db.offerReview.groupBy({
				by: ["offerId"],
				where: {
					offerId: {
						in: offerIds,
					},
				},
				_avg: {
					rating: true,
				},
				_count: {
					rating: true,
				},
			});

			// Create a map for quick lookup of review statistics
			const statsMap = new Map(
				reviewStats.map((stat) => [
					stat.offerId,
					{
						reviewsCount: stat._count.rating,
						averageRating: stat._avg.rating || 0,
					},
				]),
			);

			// Merge the results
			const offersWithStats = offers.map((offer) => {
				const stats = statsMap.get(offer.id) || {
					reviewsCount: 0,
					averageRating: 0,
				};

				return {
					...offer,
					reviewsCount: stats.reviewsCount,
					rating: stats.averageRating,
				};
			});

			return offersWithStats;
		}),
	getOffer: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }): Promise<OfferWithReviewCount> => {
			const [offer, _reviewStat] = await Promise.all([
				ctx.db.offer.findUnique({
					where: { id: input.id },
					include: offerSharedInclude,
				}),
				ctx.db.offerReview.groupBy({
					by: "offerId",
					where: {
						offerId: input.id,
					},
					_avg: {
						rating: true,
					},
					_count: {
						rating: true,
					},
				}),
			]);

			console.log("_reviewStat", _reviewStat);
			if (!offer) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Offer not found" });
			}

			return {
				...offer,
				reviewsCount: _reviewStat[0]?._count.rating || 0,
				rating: _reviewStat[0]?._avg.rating || 0,
			};
		}),
	getReviews: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const reviews = await ctx.db.offerReview.findMany({
				where: { offerId: input.id },
				include: {
					User: {
						select: {
							id: true,
							email: true,
						},
					},
				},
			});
			return reviews;
		}),
});
