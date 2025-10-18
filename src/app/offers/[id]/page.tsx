import { ArrowLeft, RotateCcw, Shield, Star, Truck } from "lucide-react";
import Link from "next/link";
import { api } from "#/trpc/server";
import {
	AddToCart,
	Carousel,
	ShareButton,
	WishlistButton,
} from "./_components";

// Mock data for offer details
const mockOfferDetails = {
	id: 1,
	title: "Premium Wireless Headphones",
	price: 199.99,
	originalPrice: 249.99,
	rating: 4.8,
	reviewCount: 1247,
	images: [
		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
		"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
		"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
	],
	description:
		"Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
	features: [
		"Active Noise Cancellation",
		"30-hour battery life",
		"Quick charge (5 min = 3 hours)",
		"Premium sound quality",
		"Comfortable over-ear design",
		"Bluetooth 5.0 connectivity",
		"Voice assistant support",
		"Foldable design",
	],
	specifications: {
		"Driver Size": "40mm",
		"Frequency Response": "20Hz - 20kHz",
		Impedance: "32 ohms",
		"Battery Life": "30 hours",
		"Charging Time": "2 hours",
		Connectivity: "Bluetooth 5.0",
		Weight: "250g",
		Warranty: "2 years",
	},
	discount: 20,
	inStock: true,
	stockCount: 15,
};

const OfferDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	const offer = await api.offers.getOffer({ id: Number.parseInt(id) });

	const _handleShare = () => {
		// TO_handleSharent share functionality
		console.log("Share product:", offer.id);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			{/* Back Button */}
			<Link
				href="/catalog"
				className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
				aria-label="Back to catalog"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Catalog
			</Link>

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
						<h1 className="mb-4 font-bold text-3xl text-gray-900">
							{mockOfferDetails.title}
						</h1>
						<div className="mb-4 flex items-center">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={`star-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											i
										}`}
										className={`h-5 w-5 ${
											i < Math.floor(mockOfferDetails.rating)
												? "fill-current text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<span className="ml-2 text-gray-600">
								{offer.rating} ({offer.OfferReview.length} reviews)
							</span>
						</div>
						<div className="mb-6 flex items-center space-x-4">
							<span className="font-bold text-4xl text-gray-900">
								${offer.price}
							</span>
							<span className="text-2xl text-gray-500 line-through">
								${offer.originalPrice}
							</span>
						</div>
					</div>

					{/* Description */}
					<div>
						<h3 className="mb-2 font-semibold text-gray-900 text-lg">
							Description
						</h3>
						<p className="text-gray-600 leading-relaxed">{offer.description}</p>
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

			{/* Specifications */}
			<div className="mt-12">
				<h3 className="mb-6 font-bold text-2xl text-gray-900">
					Specifications
				</h3>
				<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
					<div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
						{Object.entries(mockOfferDetails.specifications).map(
							([key, value], index) => (
								<div
									key={key}
									className={`border-gray-200 border-b p-4 ${
										index % 2 === 0 ? "bg-gray-50" : "bg-white"
									} ${index >= Object.keys(mockOfferDetails.specifications).length - 2 ? "border-b-0" : ""}`}
								>
									<dt className="font-medium text-gray-500 text-sm">{key}</dt>
									<dd className="mt-1 text-gray-900 text-sm">{value}</dd>
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferDetailsPage;
