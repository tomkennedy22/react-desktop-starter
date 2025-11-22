import * as fs from "node:fs/promises";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type {
	Country,
	Person,
	Prisma as PrismaType,
	// Enums
	Sample,
} from "./generated/prisma/client";
import {
	Prisma,
	PrismaClient,
	Sample as SampleEnum,
} from "./generated/prisma/client";

export { Prisma };
export type {
	PrismaType,
	Person,
	Country,
	// Enums
	Sample,
};

export { SampleEnum, PrismaClient };

const databaseFolderPath = "./src/backend/db/databases";
const templateDatabasePath = `${databaseFolderPath}/template.db`;

let prisma: PrismaClient | undefined;
export const getPrismaClient = async () => {
	const dbId = 1;
	const userDatabasePath = `${databaseFolderPath}/user-db-${dbId}.db`;
	const connectionString = `file:${userDatabasePath}`;

	if (prisma) {
		console.log("Found existing PrismaClient instance, now returning");
		return prisma;
	}

	try {
		await fs.access(userDatabasePath);
		console.log("File exists!");
	} catch {
		console.log("File does NOT exist.");
		// copy template database to user database
		await fs.mkdir(path.dirname(userDatabasePath), { recursive: true });
		await fs.copyFile(templateDatabasePath, userDatabasePath);
	}

	const adapter = new PrismaBetterSqlite3({ url: connectionString });
	prisma = new PrismaClient({ adapter });

	return prisma;
};
