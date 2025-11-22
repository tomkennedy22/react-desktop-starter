import { getPrismaClient } from "./index";

async function main() {
	const prisma = await getPrismaClient();

	console.log("Seeding database...", { prisma });

	await prisma.country.upsert({
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

	await prisma.country.upsert({
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

	const countries = await prisma.country.findMany();
	const people = await prisma.person.findMany();

	console.log("Prisma seed complete", { countries, people });
}
main()
	.then(async () => {
		const prisma = await getPrismaClient();
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		const prisma = await getPrismaClient();
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
