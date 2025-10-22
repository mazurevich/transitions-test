import type { Offer } from "@prisma/client";
import type { FC } from "react";
/** @ts-ignore */
import { ViewTransition } from "react";

type PriceProps = Pick<Offer, "id" | "price" | "originalPrice">;

export const Price: FC<PriceProps> = ({ id, price, originalPrice }) => {
	return (
		<ViewTransition name={`offer-price-${id}`}>
			<div className="mb-6 flex items-center space-x-4">
				<span className="font-bold text-4xl text-gray-900">${price}</span>
				{originalPrice ? (
					<span className="text-2xl text-gray-500 line-through">
						${originalPrice}
					</span>
				) : null}
			</div>
		</ViewTransition>
	);
};
/*  */
