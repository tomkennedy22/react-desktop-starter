import { PrismaClient } from "./index";

const prisma = new PrismaClient();
async function main() {
	const usa = await prisma.country.upsert({
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

	const canada = await prisma.country.upsert({
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
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
