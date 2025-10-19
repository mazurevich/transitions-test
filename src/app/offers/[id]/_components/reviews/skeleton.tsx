/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import type { FC } from "react";

export const ReviewsSkeleton: FC = () => {
	return (
		<div className="mt-12">
			{/* Header skeleton */}
			<div className="mb-6">
				<div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
			</div>

			{/* Reviews list skeleton */}
			<div className="space-y-6">
				{[...Array(3)].map((_, reviewIndex) => (
					<div
						key={`review-skeleton-${reviewIndex}`}
						className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
					>
						{/* Review header with user info and date */}
						<div className="mb-4 flex items-start justify-between">
							<div className="flex items-center space-x-3">
								{/* User avatar skeleton */}
								<div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
								<div>
									{/* Username skeleton */}
									<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
									{/* Rating stars skeleton */}
									<div className="flex items-center space-x-1">
										{[...Array(5)].map((_, starIndex) => (
											<div
												key={`star-skeleton-${reviewIndex}-${starIndex}`}
												className="h-4 w-4 animate-pulse rounded bg-gray-200"
											/>
										))}
									</div>
								</div>
							</div>
							{/* Date skeleton */}
							<div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
						</div>

						{/* Review comment skeleton */}
						<div className="space-y-2">
							<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
							<div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
							<div className="h-4 w-3/5 animate-pulse rounded bg-gray-200" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
