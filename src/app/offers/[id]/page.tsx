"use client";

import {
	ArrowLeft,
	Heart,
	RotateCcw,
	Share2,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

const OfferDetailsPage = () => {
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isWishlisted, setIsWishlisted] = useState(false);

	const handleAddToCart = () => {
		// TODO: Implement add to cart functionality
		console.log("Add to cart:", mockOfferDetails.id, "Quantity:", quantity);
	};

	const handleWishlistToggle = () => {
		setIsWishlisted(!isWishlisted);
		// TODO: Implement wishlist functionality
		console.log("Wishlist toggle:", mockOfferDetails.id);
	};

	const handleShare = () => {
		// TODO: Implement share functionality
		console.log("Share product:", mockOfferDetails.id);
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
				<div className="space-y-4">
					<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
						<img
							src={mockOfferDetails.images[selectedImage]}
							alt={mockOfferDetails.title}
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="grid grid-cols-3 gap-2">
						{mockOfferDetails.images.map((image, index) => (
							<button
								key={image}
								type="button"
								onClick={() => setSelectedImage(index)}
								className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
									selectedImage === index
										? "border-blue-500"
										: "border-gray-200 hover:border-gray-300"
								}`}
								aria-label={`View image ${index + 1}`}
							>
								<img
									src={image}
									alt={`${mockOfferDetails.title} view ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				{/* Product Details */}
				<div className="space-y-6">
					<div>
						<div className="mb-2 flex items-center justify-between">
							<span className="rounded bg-red-500 px-2 py-1 font-medium text-sm text-white">
								-{mockOfferDetails.discount}% OFF
							</span>
							<div className="flex items-center space-x-2">
								<button
									type="button"
									onClick={handleWishlistToggle}
									className={`rounded-full p-2 transition-colors ${
										isWishlisted
											? "bg-red-50 text-red-500"
											: "text-gray-400 hover:bg-red-50 hover:text-red-500"
									}`}
									aria-label={
										isWishlisted ? "Remove from wishlist" : "Add to wishlist"
									}
								>
									<Heart
										className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
									/>
								</button>
								<button
									type="button"
									onClick={handleShare}
									className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
									aria-label="Share product"
								>
									<Share2 className="h-5 w-5" />
								</button>
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
								{mockOfferDetails.rating} ({mockOfferDetails.reviewCount}{" "}
								reviews)
							</span>
						</div>
						<div className="mb-6 flex items-center space-x-4">
							<span className="font-bold text-4xl text-gray-900">
								${mockOfferDetails.price}
							</span>
							<span className="text-2xl text-gray-500 line-through">
								${mockOfferDetails.originalPrice}
							</span>
						</div>
					</div>

					{/* Description */}
					<div>
						<h3 className="mb-2 font-semibold text-gray-900 text-lg">
							Description
						</h3>
						<p className="text-gray-600 leading-relaxed">
							{mockOfferDetails.description}
						</p>
					</div>

					{/* Features */}
					<div>
						<h3 className="mb-3 font-semibold text-gray-900 text-lg">
							Key Features
						</h3>
						<ul className="grid grid-cols-2 gap-2">
							{mockOfferDetails.features.map((feature) => (
								<li key={feature} className="flex items-center text-gray-600">
									<div className="mr-3 h-2 w-2 rounded-full bg-blue-500" />
									{feature}
								</li>
							))}
						</ul>
					</div>

					{/* Quantity and Add to Cart */}
					<div className="space-y-4">
						<div className="flex items-center space-x-4">
							<label
								htmlFor="quantity"
								className="font-medium text-gray-700 text-sm"
							>
								Quantity:
							</label>
							<select
								id="quantity"
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								className="rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
							>
								{[...Array(10)].map((_, i) => (
									<option key={`quantity-${i + 1}`} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<button
							type="button"
							onClick={handleAddToCart}
							disabled={!mockOfferDetails.inStock}
							className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
						>
							<ShoppingCart className="h-5 w-5" />
							<span>
								{mockOfferDetails.inStock ? "Add to Cart" : "Out of Stock"}
							</span>
						</button>
						{mockOfferDetails.inStock && (
							<p className="text-green-600 text-sm">
								✓ In stock ({mockOfferDetails.stockCount} available)
							</p>
						)}
					</div>

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
