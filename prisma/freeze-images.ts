import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const offerImages = await prisma.offerImage.findMany({ select: { id: true, imageUrl: true } });

for (const offerImage of offerImages) {
    const image = await fetch(offerImage.imageUrl);
    const redirectedUrl = image.url;

    await prisma.offerImage.update({
        where: { id: offerImage.id },
        data: { imageUrl: redirectedUrl },
    });
}