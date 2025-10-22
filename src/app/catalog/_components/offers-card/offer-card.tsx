"use client";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { ViewTransition } from "#/app/_components";
import type { RouterOutputs } from "#/trpc/react";

type OfferWithReviewCount = RouterOutputs["offers"]["getOffers"][number];

export const OfferCard: FC<{ offer: OfferWithReviewCount }> = ({ offer }) => {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/offers/${offer.id}`} className="block">
				<div className="h-48 w-full overflow-hidden">
					{offer.OfferImage[0] ? (
						<div className="relative">
							<ViewTransition name={`offer-image-${offer.OfferImage[0]?.id}`}>
								<Image
									width={400}
									height={300}
									src={offer.OfferImage[0].imageUrl}
									alt={offer.title}
									className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
								/>
							</ViewTransition>
						</div>
					) : (
						<div className="h-48 w-full animate-pulse bg-gray-200" />
					)}
					{offer.originalPrice ? (
						<div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 font-medium text-sm text-white">
							-
							{offer.originalPrice
								? ((offer.originalPrice - offer.price) / offer.originalPrice) *
									100
								: 0}
							%
						</div>
					) : null}
				</div>
				<div className="p-4">
					<h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 text-lg">
						<ViewTransition name={`offer-title-${offer.id}`}>
							<span className="mb-4 font-bold text-1xl text-gray-900">
								{offer.title}
							</span>
							{/* {offer.title} */}
						</ViewTransition>
					</h3>
					<ViewTransition name={`offer-description-${offer.id}`}>
						<p className="mb-3 line-clamp-2 text-gray-600 text-sm">
							{offer.description}
						</p>
					</ViewTransition>
					<div className="mb-2 flex items-center">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<Star
									key={`star-${
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										i
									}`}
									className={`h-4 w-4 ${
										i < Math.floor(offer.rating)
											? "fill-current text-yellow-400"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="ml-2 text-gray-600 text-sm">
							{Math.round(offer.rating * 10) / 10} ({offer.reviewsCount})
						</span>
					</div>
					<div className="flex items-center justify-between">
						<ViewTransition name={`offer-price-${offer.id}`}>
							<div className="flex items-center space-x-2">
								<span className="font-bold text-2xl text-gray-900">
									${offer.price}
								</span>
								{offer.originalPrice ? (
									<span className="text-gray-500 text-lg line-through">
										${offer.originalPrice}
									</span>
								) : null}
							</div>
						</ViewTransition>
						<ViewTransition name={`offer-add-to-cart-${offer.id}`}>
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									// TODO: Add to cart functionality
									console.log("Add to cart:", offer.id);
								}}
								className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
								aria-label={`Add ${offer.title} to cart`}
							>
								<ShoppingCart className="h-4 w-4" />
								<span>Add to Cart</span>
							</button>
						</ViewTransition>
					</div>
				</div>
			</Link>
		</div>
	);
};
