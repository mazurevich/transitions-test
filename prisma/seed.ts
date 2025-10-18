import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample data arrays for generating realistic offers
const categories = [
	"Electronics",
	"Fashion",
	"Home & Garden",
	"Sports",
	"Books",
	"Automotive",
	"Beauty",
	"Toys",
	"Food & Beverages",
	"Health",
	"Office Supplies",
	"Jewelry",
];

const titles = [
	"Premium Wireless Headphones",
	"Vintage Leather Jacket",
	"Smart Home Security System",
	"Professional Camera Lens",
	"Organic Coffee Beans",
	"Yoga Mat Premium",
	"Gaming Mechanical Keyboard",
	"Designer Handbag",
	"Solar Panel Kit",
	"Bluetooth Speaker",
	"Fitness Tracker",
	"Artisan Ceramic Bowl",
	"LED Desk Lamp",
	"Running Shoes",
	"Essential Oil Set",
	"Portable Power Bank",
	"Handmade Wooden Table",
	"Protein Powder",
	"Smart Watch",
	"Crystal Wine Glasses",
	"Camping Tent",
	"Skincare Set",
	"Board Game Collection",
	"Electric Bike",
	"Coffee Maker",
	"Luxury Perfume",
	"Phone Case",
	"Garden Tools Set",
	"Cookbook Collection",
	"Hiking Backpack",
];

const descriptions = [
	"High-quality product with excellent features and durability.",
	"Perfect for everyday use with modern design and functionality.",
	"Premium materials and craftsmanship for long-lasting performance.",
	"Innovative technology that enhances your daily experience.",
	"Eco-friendly and sustainable option for conscious consumers.",
	"Professional grade equipment suitable for commercial use.",
	"Compact and portable design for convenience and mobility.",
	"Handcrafted with attention to detail and traditional methods.",
	"Cutting-edge technology with user-friendly interface.",
	"Versatile product that adapts to various needs and situations.",
];

// Sample review comments for generating realistic reviews
const reviewComments = [
	"Excellent product, highly recommended!",
	"Great quality and fast shipping.",
	"Exactly as described, very satisfied.",
	"Good value for money, would buy again.",
	"Product arrived in perfect condition.",
	"Outstanding customer service and product quality.",
	"Love this item, exceeded my expectations.",
	"Fast delivery and great packaging.",
	"Perfect for my needs, very happy with purchase.",
	"Good product but could be better.",
	"Decent quality, reasonable price.",
	"Works as expected, no complaints.",
	"Nice product, good communication from seller.",
	"Item arrived quickly and in good condition.",
	"Very pleased with this purchase.",
	"Good quality, would recommend to others.",
	"Exactly what I was looking for.",
	"Fast shipping and excellent product.",
	"Great experience overall, thank you!",
	"Product meets all my requirements.",
	"Good value, happy with the purchase.",
	"Excellent service and product quality.",
	"Item as described, very satisfied.",
	"Quick delivery and great product.",
	"Would definitely buy from this seller again.",
	"Good product, reasonable price.",
	"Fast shipping, item in perfect condition.",
	"Very happy with this purchase.",
	"Great quality and excellent service.",
	"Product exceeded my expectations.",
];

// Function to generate random number between min and max
const randomBetween = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to get random item from array
const randomItem = <T>(array: T[]): T => {
	return array[Math.floor(Math.random() * array.length)] as T;
};

// Function to generate placeholder image URL
const generateImageUrl = (width = 400, height = 300, seed?: number): string => {
	const seedParam = seed ? `?random=${seed}` : "";
	return `https://picsum.photos/${width}/${height}${seedParam}`;
};

const getRealUrl = async (url: string): Promise<string> => {
  const image = await fetch(url);
  return image.url;
}
// Function to generate multiple images for an offer
const generateOfferImages = async (
	offerId: number,
	count: number = randomBetween(2, 4),
): Promise<Array<{ offerId: number; imageUrl: string }>> => {
	const images = await Promise.all(Array.from({ length: count }, async (_, index) => {
		const imageUrl = await getRealUrl(generateImageUrl(400, 300, offerId * 10 + index));
		return {
			offerId,
			imageUrl,
		};
	}));
	return images;
};
// Function to generate sample users for reviews
const generateSampleUsers = async (count = 20) => {
	const users = [];
	for (let i = 1; i <= count; i++) {
		const user = await prisma.user.create({
			data: {
				email: `user${i}@example.com`,
				password: "hashedpassword123", // In real app, this would be properly hashed
			},
		});
		users.push({ id: user.id });
	}
	return users;
};

// Function to generate random reviews for an offer
const generateOfferReviews = (
	offerId: number,
	users: Array<{ id: number }>,
	reviewCount: number,
): Array<{
	offerId: number;
	userId: number;
	rating: number;
	comment: string;
}> => {
	const reviews = [];
	const shuffledUsers = [...users].sort(() => Math.random() - 0.5);

	for (let i = 0; i < reviewCount; i++) {
		const user = shuffledUsers[i % shuffledUsers.length];
		if (!user) continue;
		const rating = randomBetween(1, 5);
		const comment = randomItem(reviewComments);

		reviews.push({
			offerId,
			userId: user.id,
			rating,
			comment,
		});
	}

	return reviews;
};

async function main() {
	console.log("🌱 Starting database seeding...");

	// Clear existing data
	await prisma.offerReview.deleteMany();
	await prisma.offerImage.deleteMany();
	await prisma.offer.deleteMany();
	await prisma.user.deleteMany();

	console.log("🗑️ Cleared existing data (offers, images, reviews, and users)");

	// Generate sample users for reviews
	console.log("👥 Creating sample users...");
	const sampleUsers = await generateSampleUsers(20);
	console.log(`✅ Created ${sampleUsers.length} sample users`);

	// Generate 50 random offers
	const offers = [];
	for (let i = 1; i <= 50; i++) {
		const category = randomItem(categories);
		const title = randomItem(titles);
		const description = randomItem(descriptions);
		const price = randomBetween(100, 500);
		const quantity = randomBetween(10, 20);

		// Create offer
		const offer = await prisma.offer.create({
			data: {
				title: `${title} - ${category}`,
				description: `${description} This ${title.toLowerCase()} is perfect for ${category.toLowerCase()} enthusiasts. Features include premium quality materials and modern design.`,
				price: price,
				stock: quantity,
				isActive: true,
			},
		});

		offers.push(offer);

		// Generate additional images for this offer
		const offerImages = await generateOfferImages(offer.id);
		await prisma.offerImage.createMany({
			data: offerImages,
		});

		console.log(`✅ Created offer ${i}/50: ${offer.title}`);
	}

	// Generate random reviews for each offer
	console.log("⭐ Generating reviews for offers...");
	let totalReviews = 0;
	for (const offer of offers) {
		const reviewCount = randomBetween(0, 10); // Random number of reviews (0-10)

		if (reviewCount > 0) {
			const reviews = generateOfferReviews(offer.id, sampleUsers, reviewCount);
			await prisma.offerReview.createMany({
				data: reviews,
			});
			totalReviews += reviewCount;
		}
	}

	console.log("🎉 Database seeding completed successfully!");
	console.log(`📊 Created ${offers.length} offers with images`);
	console.log(`⭐ Generated ${totalReviews} reviews across all offers`);
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
