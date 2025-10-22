"use client";
import { ShoppingCart } from "lucide-react";
/** @ts-ignore */
import { useState, ViewTransition } from "react";

export const AddToCart = ({
	offerId,
	stockCount,
}: {
	offerId: number;
	stockCount: number;
}) => {
	const [quantity, setQuantity] = useState(1);

	const inStock = stockCount > 0;

	const handleAddToCart = () => {
		// TODO: Implement add to cart functionality
		console.log("Add to cart:", offerId, "Quantity:", quantity);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-4">
				<label htmlFor="quantity" className="font-medium text-gray-700 text-sm">
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
			<ViewTransition name={`offer-add-to-cart-${offerId}`}>
				<button
					type="button"
					onClick={handleAddToCart}
					disabled={!inStock}
					className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
				>
					<ShoppingCart className="h-5 w-5" />
					<span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
				</button>
			</ViewTransition>
			{inStock && (
				<p className="text-green-600 text-sm">
					✓ In stock ({stockCount} available)
				</p>
			)}
		</div>
	);
};
