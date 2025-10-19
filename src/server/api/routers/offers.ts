import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const inputSchema = z.object({
	search: z.string().optional(),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(10),
});

export const offersRouter = createTRPCRouter({
	getOffers: publicProcedure
		.input(inputSchema)
		.query(async ({ ctx, input }) => {
			// First request: Get the required offers
			const offers = await ctx.db.offer.findMany({
				where: {
					OR: [
						{ title: { contains: input.search } },
						{ description: { contains: input.search } },
					],
					isActive: true,
				},
				include: {
					OfferImage: {
						select: {
							id: true,
							imageUrl: true,
							title: true,
						},
					},
				},
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
		.query(async ({ ctx, input }) => {
			const offer = await ctx.db.offer.findUnique({
				where: { id: input.id },
				include: {
					OfferImage: {
						select: {
							id: true,
							imageUrl: true,
							title: true,
						},
					},
					OfferReview: {
						select: {
							id: true,
							rating: true,
							comment: true,
							createdAt: true,
							User: {
								select: {
									id: true,
									email: true,
								},
							},
						},
						orderBy: {
							createdAt: "desc",
						},
					},
				},
			});

			if (!offer) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Offer not found" });
			}

			return offer;
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
