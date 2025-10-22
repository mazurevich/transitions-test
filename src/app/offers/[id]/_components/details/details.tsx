"use client";
import { RotateCcw, Shield, Star, Truck } from "lucide-react";
import type { FC } from "react";
import { api } from "#/trpc/react";
import { mockOfferDetails } from "../../mocks";
import { AddToCart } from "../add-to-cart";
import { Carousel } from "../carousel";
import { Description } from "../description";
import { Price } from "../price";
import { ShareButton } from "../share-button";
import { Title } from "../title";
import { WishlistButton } from "../wishlist-button";

type DetailsProps = {
	id: number;
};

export const Details: FC<DetailsProps> = ({ id }) => {
	const [offer] = api.offers.getOffer.useSuspenseQuery({ id });
	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
			{/* Product Images */}
			<Carousel images={offer.OfferImage} />
			{/* Product Details */}
			<div className="space-y-6">
				<div>
					<div className="mb-2 flex items-center justify-between">
						<span className="rounded bg-red-500 px-2 py-1 font-medium text-sm text-white">
							-{mockOfferDetails.discount}% OFF
						</span>
						<div className="flex items-center space-x-2">
							<WishlistButton offerId={offer.id} />
							<ShareButton offerId={offer.id} />
						</div>
					</div>
					<Title id={offer.id} title={offer.title} />
					{/* <h1 className="mb-4 font-bold text-3xl text-gray-900">
							{offer.title}
						</h1> */}
					<div className="mb-4 flex items-center">
						<div className="flex items-center">
							{Array.from({ length: 5 }, (_, i) => (
								<Star
									key={`rating-star-${offer.id}-${i}`}
									className={`h-5 w-5 ${
										i < Math.floor(mockOfferDetails.rating)
											? "fill-current text-yellow-400"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="ml-2 text-gray-600">
							{offer.rating} ({offer.reviewsCount} reviews)
						</span>
					</div>
					<Price
						id={offer.id}
						price={offer.price}
						originalPrice={offer.originalPrice}
					/>
				</div>

				{/* Description */}
				<div>
					<h3 className="mb-2 font-semibold text-gray-900 text-lg">
						Description
					</h3>
					<Description id={offer.id} description={offer.description} />
				</div>

				{/* Features */}
				<div>
					<h3 className="mb-3 font-semibold text-gray-900 text-lg">
						Key Features
					</h3>
					{/* <ul className="grid grid-cols-2 gap-2">
							{offer.features.map((feature) => (
								<li key={feature} className="flex items-center text-gray-600">
									<div className="mr-3 h-2 w-2 rounded-full bg-blue-500" />
									{feature}
								</li>
							))}
						</ul> */}
				</div>

				{/* Quantity and Add to Cart */}
				<AddToCart offerId={offer.id} stockCount={offer.stock} />

				{/* Shipping Info */}
				<div className="border-t pt-6">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="flex items-center space-x-3">
							<Truck className="h-5 w-5 text-blue-600" />
							<div>
								<p className="font-medium text-gray-900 text-sm">
									Free Shipping
								</p>
								<p className="text-gray-600 text-xs">On orders over $50</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-gray-900 text-sm">
									2-Year Warranty
								</p>
								<p className="text-gray-600 text-xs">Full coverage</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<RotateCcw className="h-5 w-5 text-purple-600" />
							<div>
								<p className="font-medium text-gray-900 text-sm">
									30-Day Returns
								</p>
								<p className="text-gray-600 text-xs">No questions asked</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
