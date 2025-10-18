"use client";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { RouterOutputs } from "#/trpc/react";

type OfferWithReviews = RouterOutputs["offers"]["getOffers"][number];

export const OfferCard: FC<{ offer: OfferWithReviews }> = ({ offer }) => {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/offers/${offer.id}`} className="block">
				<div className="relative">
					{offer.OfferImage[0] ? <Image
						width={400}
						height={300}
						src={offer.OfferImage[0].imageUrl}
						alt={offer.title}
						className="h-48 w-full object-cover"
					/> : <div className="h-48 w-full bg-gray-200 animate-pulse" />}
					<div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 font-medium text-sm text-white">
						-
						{offer.originalPrice
							? ((offer.originalPrice - offer.price) / offer.originalPrice) *
								100
							: 0}
						%
					</div>
				</div>
				<div className="p-4">
					<h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 text-lg">
						{offer.title}
					</h3>
					<p className="mb-3 line-clamp-2 text-gray-600 text-sm">
						{offer.description}
					</p>
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
							{offer.rating} ({offer.reviewsCount})
						</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<span className="font-bold text-2xl text-gray-900">
								${offer.price}
							</span>
							<span className="text-gray-500 text-lg line-through">
								${offer.originalPrice}
							</span>
						</div>
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
					</div>
				</div>
			</Link>
		</div>
	);
};
