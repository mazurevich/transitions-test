/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { OffersCardSkeleton } from "../offers-card/skeleton";
import { OFFERS_CARDS_LIMIT } from "./constants";

export const OffersCardsSkeleton = () => {
	return Array.from({ length: OFFERS_CARDS_LIMIT }, (_, index) => (
		<OffersCardSkeleton key={`offers-card-skeleton-${index}`} />
	));
};
