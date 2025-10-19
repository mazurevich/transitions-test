/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import type { FC } from "react";

export const OffersCardSkeleton: FC = () => {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
			{/* Image skeleton */}
			<div className="h-48 w-full animate-pulse bg-gray-200" />

			{/* Content skeleton */}
			<div className="p-4">
				{/* Title skeleton */}
				<div className="mb-2">
					<div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Description skeleton */}
				<div className="mb-3">
					<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
					<div className="mt-1 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Rating skeleton */}
				<div className="mb-2 flex items-center">
					<div className="flex items-center space-x-1">
						{[...Array(5)].map((_, i) => (
							<div
								key={`star-skeleton-${i}`}
								className="h-4 w-4 animate-pulse rounded bg-gray-200"
							/>
						))}
					</div>
					<div className="ml-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
				</div>

				{/* Price and button skeleton */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
						<div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
					</div>
					<div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
				</div>
			</div>
		</div>
	);
};
