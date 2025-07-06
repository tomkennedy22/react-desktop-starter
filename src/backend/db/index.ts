import type {
	Country,
	Person,
	Prisma as PrismaType,
	// Enums
	Sample,
} from "@prisma/client";
import { Prisma, PrismaClient, Sample as SampleEnum } from "@prisma/client";

export { Prisma };

export type {
	PrismaType,
	Person,
	Country,
	// Enums
	Sample,
};

export { SampleEnum, PrismaClient };

let prismaClient: PrismaClient | undefined;
export const getPrismaClient = () => {
	console.log("Initializing Prisma Client...", {
		PrismaClient,
		Prisma,
	});

	if (prismaClient) {
		console.log("Prisma Client already initialized", prismaClient);
		return prismaClient;
	}

	prismaClient = new PrismaClient();
	console.log("Prisma Client initialized", prismaClient);

	return prismaClient;
};
