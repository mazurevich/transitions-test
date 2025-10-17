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

const locations = [
	"New York, NY",
	"Los Angeles, CA",
	"Chicago, IL",
	"Houston, TX",
	"Phoenix, AZ",
	"Philadelphia, PA",
	"San Antonio, TX",
	"San Diego, CA",
	"Dallas, TX",
	"San Jose, CA",
	"Austin, TX",
	"Jacksonville, FL",
	"Fort Worth, TX",
	"Columbus, OH",
	"Charlotte, NC",
	"San Francisco, CA",
	"Indianapolis, IN",
	"Seattle, WA",
	"Denver, CO",
	"Washington, DC",
];

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

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

// Function to generate multiple images for an offer
const generateOfferImages = (
	offerId: number,
	count: number = randomBetween(2, 4),
): Array<{ offerId: number; imageUrl: string }> => {
	return Array.from({ length: count }, (_, index) => {
		return {
			offerId,
			imageUrl: generateImageUrl(400, 300, offerId * 10 + index),
		};
	});
};

async function main() {
	console.log("🌱 Starting database seeding...");

	// Clear existing data
	await prisma.offerImage.deleteMany();
	await prisma.offer.deleteMany();

	console.log("🗑️ Cleared existing offers and images");

	// Generate 50 random offers
	const offers = [];
	for (let i = 1; i <= 50; i++) {
		const category = randomItem(categories);
		const title = randomItem(titles);
		const description = randomItem(descriptions);
		const price = randomBetween(100, 500);
		const quantity = randomBetween(10, 20);
		const location = randomItem(locations);
		const currency = randomItem(currencies);

		// Create offer
		const offer = await prisma.offer.create({
			data: {
				title: `${title} - ${category}`,
				description: `${description} This ${title.toLowerCase()} is perfect for ${category.toLowerCase()} enthusiasts. Features include premium quality materials and modern design.`,
				price: price,
				currency: currency,
				stock: quantity,
				location: location,
				imageUrl: generateImageUrl(600, 400, i), // Main image
				isActive: true,
			},
		});

		offers.push(offer);

		// Generate additional images for this offer
		const offerImages = generateOfferImages(offer.id);
		await prisma.offerImage.createMany({
			data: offerImages,
		});

		console.log(`✅ Created offer ${i}/50: ${offer.title}`);
	}

	console.log("🎉 Database seeding completed successfully!");
	console.log(`📊 Created ${offers.length} offers with images`);
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
