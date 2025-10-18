"use client";
import { Share2 } from "lucide-react";

export const ShareButton = ({ offerId }: { offerId: number }) => {
	const handleShare = () => {
		console.log("Share product:", offerId);
	};

	return (
		<button
			type="button"
			onClick={handleShare}
			className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
			aria-label="Share product"
		>
			<Share2 className="h-5 w-5" />
		</button>
	);
};
