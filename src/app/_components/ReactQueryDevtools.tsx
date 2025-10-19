"use client";
import { ReactQueryDevtools as ReactQueryDevtoolsComponent } from "@tanstack/react-query-devtools";
import type { FC } from "react";

interface ReactQueryDevtoolsProps {
	initialIsOpen?: boolean;
}

export const ReactQueryDevtools: FC<ReactQueryDevtoolsProps> = ({
	initialIsOpen = false,
}) => {
	// Only render DevTools in development
	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	return <ReactQueryDevtoolsComponent initialIsOpen={initialIsOpen} />;
};
