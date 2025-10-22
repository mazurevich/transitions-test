"use client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useEffect } from "react";
import { api } from "#/trpc/react";
import { OfferCard } from "../offers-card";
import { OFFERS_CARDS_LIMIT } from "./constants";

export const OffersCards = () => {
	const [offers] = api.offers.getOffers.useSuspenseQuery({
		page: 1,
		limit: OFFERS_CARDS_LIMIT,
		search: "",
	});

	const queryClient = useQueryClient();

	useEffect(() => {
		// add chache for all singe items which we get from getOffer
		// navigation to items will be instant in that case
		// shape of data should be the same to not break details page
		offers.forEach((offer) => {
			const key = getQueryKey(
				api.offers.getOffer,
				{
					id: offer.id,
				},
				"query",
			);
			queryClient.setQueryData(key, offer);
		});
	}, [offers, queryClient.setQueryData]);

	return offers.map((offer) => <OfferCard key={offer.id} offer={offer} />);
};
