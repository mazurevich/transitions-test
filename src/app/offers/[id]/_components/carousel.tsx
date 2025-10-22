"use client";
import type { OfferImage } from "@prisma/client";
import Image from "next/image";
/** @ts-ignore */
import { type FC, useState, ViewTransition } from "react";

type OfferImageWithId = {
	images: Pick<OfferImage, "id" | "imageUrl" | "title">[];
};
export const Carousel: FC<OfferImageWithId> = ({ images }) => {
	const [selectedImage, setSelectedImage] = useState(0);

	const currentImage = images[selectedImage];
	if (!currentImage) {
		return null;
	}

	const title = currentImage.title ?? "Offer";
	const imageUrl = currentImage.imageUrl;

	return (
		<div className="space-y-4">
			<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
				<ViewTransition
					name={`offer-image-${currentImage.id}`}
					onEnter={(element: HTMLElement, type: string) => {
						console.log("enter", element, type);
					}}
					onExit={(element: HTMLElement, type: string) => {
						console.log("leave", element, type);
					}}
					onShare={() => console.log("share")}
				>
					<img
						src={imageUrl}
						alt={`${title} view ${selectedImage + 1}`}
						className="h-full w-full object-cover"
						width={400}
						height={300}
					/>
				</ViewTransition>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{images.map((image, index) => (
					<button
						key={image.id}
						type="button"
						onClick={() => setSelectedImage(index)}
						className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
							selectedImage === index
								? "border-blue-500"
								: "border-gray-200 hover:border-gray-300"
						}`}
						aria-label={`View image ${index + 1}`}
					>
						<Image
							width={400}
							height={300}
							src={image.imageUrl}
							alt={`${image.title ?? "Offer"} view ${index + 1}`}
							className="h-full w-full object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};
