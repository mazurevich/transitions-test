"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { queueScrollRestore } from "#/app/_components/scroll-restoration";

export const BackToCatalog = () => {
	const handleClick = () => {
		queueScrollRestore("/catalog");
	};

	return (
		<Link
			href="/catalog"
			scroll={false}
			onClick={handleClick}
			className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
			aria-label="Back to catalog"
		>
			<ArrowLeft className="mr-2 h-4 w-4" />
			Back to Catalog
		</Link>
	);
};
