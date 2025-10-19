/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	experimental: {
		viewTransition: true,
		cacheComponents: true,
	},
	reactCompiler: true,

	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
			{ protocol: "https", hostname: "picsum.photos", pathname: "/**" },
		],
	},
};

export default config;
/*  */
