/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

export const SpecificationsSkeleton = () => {
	return (
		<div className="mt-12">
			<div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />
			<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
				<div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
					{[...Array(8)].map((_, index) => (
						<div
							key={`spec-skeleton-${index}`}
							className={`border-gray-200 border-b p-4 ${
								index % 2 === 0 ? "bg-gray-50" : "bg-white"
							} ${index >= 6 ? "border-b-0" : ""}`}
						>
							<div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
							<div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
