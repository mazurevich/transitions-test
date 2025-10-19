"use client";
import { api } from "#/trpc/react";
import { OfferCard } from "../offers-card";
import { OFFERS_CARDS_LIMIT } from "./constants";

export const OffersCards = () => {
	const [offers] = api.offers.getOffers.useSuspenseQuery({
		page: 1,
		limit: OFFERS_CARDS_LIMIT,
		search: "",
	});

	return offers.map((offer) => <OfferCard key={offer.id} offer={offer} />);
};
