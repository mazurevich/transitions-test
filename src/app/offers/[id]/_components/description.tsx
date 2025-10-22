"use client";
/** @ts-ignore */
import { ViewTransition } from "react";

export const Description = ({
	id,
	description,
}: {
	id: number;
	description: string;
}) => {
	return (
		<ViewTransition name={`offer-description-${id}`}>
			<p className="mb-3 line-clamp-2 text-gray-600 text-sm">{description}</p>
		</ViewTransition>
	);
};
