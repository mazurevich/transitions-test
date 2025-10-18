"use client";
import { ViewTransition } from "#/app/_components";

export const Title = ({ id, title }: { id: number; title: string }) => {
	return (
		<ViewTransition name={`offer-title-${id}`}>
			<span className="mb-4 font-bold text-3xl text-gray-900">{title}</span>
		</ViewTransition>
	);
};
