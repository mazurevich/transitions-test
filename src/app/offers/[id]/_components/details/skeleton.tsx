/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import type { FC } from "react";

type DetailsSkeletonProps = {
	id: number;
};
export const DetailsSkeleton: FC<DetailsSkeletonProps> = ({ id }) => {
	console.log("DetailsSkeleton");
	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
			{/* Product Images Skeleton */}
			<div className="space-y-4">
				{/* Main Image */}
				<div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
				{/* Thumbnail Images */}
				<div className="grid grid-cols-3 gap-2">
					<div className="aspect-square animate-pulse overflow-hidden rounded bg-gray-200" />
					<div className="aspect-square animate-pulse overflow-hidden rounded bg-gray-200" />
					<div className="aspect-square animate-pulse overflow-hidden rounded bg-gray-200" />
				</div>
			</div>

			{/* Product Details Skeleton */}
			<div className="space-y-6">
				{/* Discount Badge and Action Buttons */}
				<div className="flex items-center justify-between">
					<div className="h-6 w-20 animate-pulse rounded bg-red-200" />
					<div className="flex space-x-2">
						<div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
						<div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
					</div>
				</div>

				{/* Title */}
				<div className="space-y-2">
					<div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Rating */}
				<div className="flex items-center space-x-2">
					<div className="flex space-x-1">
						{[...Array(5)].map((_, i) => (
							<div
								key={`star-skeleton-${i}`}
								className="h-5 w-5 animate-pulse rounded bg-gray-200"
							/>
						))}
					</div>
					<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Price */}
				<div className="flex items-center space-x-3">
					<div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
					<div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Description */}
				<div className="space-y-3">
					<div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
					<div className="space-y-2">
						<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
					</div>
				</div>

				{/* Key Features */}
				<div className="space-y-3">
					<div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
					<div className="grid grid-cols-2 gap-2">
						{[...Array(6)].map((_, i) => (
							<div
								key={`feature-skeleton-${i}`}
								className="flex items-center space-x-2"
							>
								<div className="h-2 w-2 animate-pulse rounded-full bg-gray-200" />
								<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
							</div>
						))}
					</div>
				</div>

				{/* Add to Cart */}
				<div className="space-y-3">
					<div className="flex items-center space-x-3">
						<div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
						<div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
					</div>
				</div>

				{/* Shipping Info */}
				<div className="border-t pt-6">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{[...Array(3)].map((_, i) => (
							<div
								key={`shipping-skeleton-${i}`}
								className="flex items-center space-x-3"
							>
								<div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
								<div className="space-y-1">
									<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
									<div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
