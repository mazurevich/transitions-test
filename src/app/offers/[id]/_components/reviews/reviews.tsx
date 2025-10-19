import { Star } from "lucide-react";
import { api } from "#/trpc/server";

interface ReviewsProps {
	id: number;
}

const Reviews = async ({ id }: ReviewsProps) => {
	const reviews = await api.offers.getReviews({ id });

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(date));
	};

	const getUserInitials = (email: string) => {
		return email.charAt(0).toUpperCase();
	};

	if (reviews.length === 0) {
		return (
			<div className="mt-12">
				<h3 className="mb-6 font-bold text-2xl text-gray-900">Reviews</h3>
				<div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
					<p className="text-gray-500">
						No reviews yet. Be the first to review this product!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-12">
			<h3 className="mb-6 font-bold text-2xl text-gray-900">
				Reviews ({reviews.length})
			</h3>
			<div className="space-y-6">
				{reviews.map((review) => (
					<div
						key={review.id}
						className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
					>
						<div className="mb-4 flex items-start justify-between">
							<div className="flex items-center space-x-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-medium text-sm text-white">
									{getUserInitials(review.User.email)}
								</div>
								<div>
									<p className="font-medium text-gray-900 text-sm">
										{review.User.email.split("@")[0]}
									</p>
									<div className="flex items-center space-x-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={`star-${review.id}-${i}`}
												className={`h-4 w-4 ${
													i < review.rating
														? "fill-current text-yellow-400"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
								</div>
							</div>
							<span className="text-gray-500 text-sm">
								{formatDate(review.createdAt)}
							</span>
						</div>
						{review.comment && (
							<p className="text-gray-700 leading-relaxed">{review.comment}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export { Reviews };
