import { Suspense } from "react";
import { OffersCards, OffersCardsSkeleton } from "./_components/offers-cards";

export default async function CatalogPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-gray-900">
					Current Offers
				</h1>
				<p className="text-gray-600">
					Discover amazing deals on the latest products
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<Suspense fallback={<OffersCardsSkeleton />}>
					<OffersCards />
				</Suspense>
			</div>
		</div>
	);
}
