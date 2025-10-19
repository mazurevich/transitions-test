import { api } from "#/trpc/server";
import { OfferCard } from "../offers-card";
import { OFFERS_CARDS_LIMIT } from "./constants";

export const OffersCards = async () => {
	const offers = await api.offers.getOffers({
		page: 1,
		limit: OFFERS_CARDS_LIMIT,
		search: "",
	});

	return offers.map((offer) => <OfferCard key={offer.id} offer={offer} />);
};
