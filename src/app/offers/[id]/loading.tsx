/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
export default function OfferDetailsLoading() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			{/* Back Button Skeleton */}
			<div className="mb-6 flex items-center">
				<div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
				<div className="ml-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
			</div>
		</div>
	);
}
