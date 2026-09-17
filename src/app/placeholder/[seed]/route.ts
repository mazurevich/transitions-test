import { getPlaceholderColors } from "#/lib/placeholder-image";

export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ seed: string }> },
) => {
	const { seed: rawSeed } = await params;
	const seed = Number.parseInt(rawSeed.replace(/\.svg$/i, ""), 10) || 0;
	const { bg, fg } = getPlaceholderColors(seed);

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#${bg}"/>
  <text x="200" y="158" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="600" fill="#${fg}">${seed}</text>
</svg>`;

	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml; charset=utf-8",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
