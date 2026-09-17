"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const storageKey = (path: string) => `scroll-y:${path}`;

let pendingScrollY: number | null = null;

export const restorePendingScroll = () => {
	if (pendingScrollY === null) {
		return;
	}

	window.scrollTo({ top: pendingScrollY, left: 0, behavior: "instant" });
};

export const queueScrollRestore = (path: string) => {
	const saved = Number(sessionStorage.getItem(storageKey(path)));
	pendingScrollY = Number.isFinite(saved) ? saved : 0;
};

export const clearPendingScroll = () => {
	pendingScrollY = null;
};

export const ScrollRestoration = () => {
	const pathname = usePathname();

	useEffect(() => {
		const handlePopState = () => {
			const saved = Number(
				sessionStorage.getItem(storageKey(window.location.pathname)),
			);
			if (Number.isFinite(saved)) {
				pendingScrollY = saved;
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	useLayoutEffect(() => {
		restorePendingScroll();
		if (pathname !== "/catalog") {
			clearPendingScroll();
		}

		const handleScroll = () => {
			sessionStorage.setItem(storageKey(pathname), String(window.scrollY));
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			handleScroll();
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pathname]);

	return null;
};
