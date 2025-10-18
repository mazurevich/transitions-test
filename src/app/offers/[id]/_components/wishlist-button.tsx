"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

export const WishlistButton = ({ offerId }: { offerId: number }) => {
	const [isWishlisted, setIsWishlisted] = useState(false);

	const handleWishlistToggle = () => {
		setIsWishlisted(!isWishlisted);
		// TODO: Implement wishlist functionality
		console.log("Wishlist toggle:", offerId);
	};
	return (
		<button
			type="button"
			onClick={handleWishlistToggle}
			className={`rounded-full p-2 transition-colors ${
				isWishlisted
					? "bg-red-50 text-red-500"
					: "text-gray-400 hover:bg-red-50 hover:text-red-500"
			}`}
			aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
		>
			<Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
		</button>
	);
};
