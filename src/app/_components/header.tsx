"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [cartItemsCount] = useState(3); // Mock cart count

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement search functionality
		console.log("Search query:", searchQuery);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<header className="border-gray-200 border-b bg-white shadow-md">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link
						href="/catalog"
						className="font-bold text-2xl text-gray-900 transition-colors hover:text-blue-600"
					>
						ShopApp
					</Link>

					{/* Search Bar */}
					<div className="mx-8 max-w-lg flex-1">
						<form onSubmit={handleSearchSubmit} className="relative">
							<div className="relative">
								<input
									type="text"
									placeholder="Search products..."
									value={searchQuery}
									onChange={handleSearchChange}
									className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
									aria-label="Search products"
								/>
								<Search
									className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400"
									aria-hidden="true"
								/>
							</div>
						</form>
					</div>

					{/* Cart Icon */}
					<Link
						href="/cart"
						className="relative p-2 text-gray-600 transition-colors hover:text-blue-600"
					>
						<ShoppingCart className="h-6 w-6" />
						{cartItemsCount > 0 && (
							<span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-medium text-white text-xs">
								{cartItemsCount}
							</span>
						)}
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
