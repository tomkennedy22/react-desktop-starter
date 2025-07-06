import type {
	Country,
	Person,
	Prisma as PrismaType,
	// Enums
	Sample,
} from "./prisma-client/client";
import {
	Prisma,
	PrismaClient,
	Sample as SampleEnum,
} from "./prisma-client/client";

export { Prisma };

export type {
	PrismaType,
	Person,
	Country,
	// Enums
	Sample,
};

export { SampleEnum, PrismaClient };
