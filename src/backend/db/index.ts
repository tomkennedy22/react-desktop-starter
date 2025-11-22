import * as fs from "node:fs/promises";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { app } from "electron";
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
import { seedDb } from "./seed";

export { Prisma };
export type {
	PrismaType,
	Person,
	Country,
	// Enums
	Sample,
};

export { SampleEnum, PrismaClient };

const resourcesPath = process.resourcesPath;
console.log("resourcesPath:", { resourcesPath });
const templateDatabasePath = path.join(resourcesPath, "template.db");

const userDataDir = app.getPath("userData");
const appPath = app.getAppPath();

let prisma: PrismaClient | undefined;
export const getPrismaClient = async ({ dbId }: { dbId: string }) => {
	let databasePath = templateDatabasePath;
	if (dbId) {
		databasePath = path.join(userDataDir, `user-db-${dbId}.db`);
	}

	const connectionString = `file:${databasePath}`;

	if (prisma) {
		console.log("Found existing PrismaClient instance, now returning");
		return prisma;
	}

	console.log("Checking if database file exists at path:", {
		databasePath,
		connectionString,
		dbId,
		userDataDir,
		resourcesPath,
		templateDatabasePath,
		appPath,
	});

	try {
		await fs.access(databasePath);
		console.log("File exists!");
	} catch {
		console.log("File does NOT exist.");
		// copy template database to user database
		await fs.mkdir(path.dirname(databasePath), { recursive: true });
		await fs.copyFile(templateDatabasePath, databasePath);
	}

	const adapter = new PrismaBetterSqlite3({ url: connectionString });
	prisma = new PrismaClient({ adapter });

	await seedDb({ db: prisma });

	return prisma;
};
