import { Suspense } from "react";
import { api, HydrateClient } from "#/trpc/server";
import { Reviews, ReviewsSkeleton } from "./_components";
import { BackToCatalog } from "./_components/back-to-catalog";
import { Details } from "./_components/details";
import { DetailsSkeleton } from "./_components/details/skeleton";
import { mockOfferDetails } from "./mocks";

// Force dynamic rendering to prevent build-time prerendering issues
export const dynamic = "force-dynamic";

// Mock data for offer details

const OfferDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	void api.offers.getOffer.prefetch({ id: Number.parseInt(id) });

	return (
		<HydrateClient>
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<BackToCatalog />

				<Suspense fallback={<DetailsSkeleton id={Number.parseInt(id)} />}>
					<Details id={Number.parseInt(id)} />
				</Suspense>

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

				{/* Reviews */}
				<Suspense fallback={<ReviewsSkeleton />}>
					<Reviews id={Number.parseInt(id)} />
				</Suspense>
			</div>
		</HydrateClient>
	);
};

export default OfferDetailsPage;
