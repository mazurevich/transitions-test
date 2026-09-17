const placeholderPalette = [
	{ bg: "1e3a5f", fg: "e2e8f0" },
	{ bg: "14532d", fg: "dcfce7" },
	{ bg: "7c2d12", fg: "ffedd5" },
	{ bg: "4c1d95", fg: "ede9fe" },
	{ bg: "9f1239", fg: "ffe4e6" },
	{ bg: "0f766e", fg: "ccfbf1" },
	{ bg: "1e40af", fg: "dbeafe" },
	{ bg: "854d0e", fg: "fef9c3" },
] as const;

export const getPlaceholderImageSrc = (seed: number): string => {
	return `/placeholder/${seed}.svg`;
};

export const getPlaceholderColors = (seed: number) => {
	return (
		placeholderPalette[seed % placeholderPalette.length] ?? {
			bg: "1e3a5f",
			fg: "e2e8f0",
		}
	);
};

export const getOfferImageSrc = (image: {
	id: number;
	imageUrl: string;
}): string => {
	if (image.imageUrl.startsWith("/")) {
		return image.imageUrl;
	}

	return getPlaceholderImageSrc(image.id);
};
