import type { PrismaClient } from "./index";

export const seedDb = async ({ db }: { db: PrismaClient }) => {
	await db.country.upsert({
		where: { countryId: 1 },
		update: {},
		create: {
			countryId: 1,
			name: "United States of America",
			people: {
				create: [
					{
						name: "Tom",
					},
					{
						name: "Kathryn",
					},
					{
						name: "Miles",
					},
					{
						name: "Travis",
					},
					{
						name: "Paul",
					},
				],
			},
		},
	});

	await db.country.upsert({
		where: { countryId: 2 },
		update: {},
		create: {
			countryId: 2,
			name: "Canada",
			people: {
				create: [
					{
						name: "John",
					},
					{
						name: "Sarah",
					},
					{
						name: "Mike",
					},
				],
			},
		},
	});

	const countries = await db.country.findMany();
	const people = await db.person.findMany();
};
