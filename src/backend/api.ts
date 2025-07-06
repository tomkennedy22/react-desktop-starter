import { initTRPC } from "@trpc/server";
import { shell } from "electron";
import z from "zod";

import { getPrismaClient } from "./db";

const t = initTRPC.create({ isServer: true });

export const router = t.router({
	triggerPing: t.procedure.mutation(() => {
		console.log("triggerPing called");

		const pongUuid = crypto.randomUUID();

		return { message: "pong test3", pongUuid };
	}),
	triggerOpenExternalLink: t.procedure
		.input(z.object({ url: z.string() }))
		.mutation(({ input }) => {
			const { url } = input;

			shell.openExternal(url);

			return { message: `Opened external link: ${url}` };
		}),
	greeting: t.procedure.input(z.object({ name: z.string() })).query((req) => {
		const { input } = req;

		return {
			text: `Hello ${input.name}` as const,
		};
	}),
	getCountries: t.procedure.query(async () => {
		const prismaClient = getPrismaClient();
		const countries = await prismaClient.country.findMany();

		return countries;
	}),
	getCredits: t.procedure.query(() => {
		return [
			{
				name: "Electron-Vite",
				imageSrc: "https://electron-vite.org/logo.svg",
				href: "https://electron-vite.org/",
				purpose: "Electron app boilerplate with Vite",
			},
			{
				name: "TanStack Router",
				imageSrc: "https://tanstack.com/assets/splash-light-CHqMsyq8.png",
				href: "https://tanstack.com/router/latest",
				purpose: "Frontend routing with great type awareness",
			},
			{
				name: "TanStack Query",
				imageSrc: "https://tanstack.com/assets/splash-light-CHqMsyq8.png",
				href: "https://tanstack.com/query/latest",
				purpose: "API Query functionality",
			},
			{
				name: "tRPC",
				imageSrc: "https://trpc.io/img/logo.svg",
				href: "https://trpc.io/",
				purpose:
					"Building API definition, API routing, and type inferrence (my favorite package!)",
			},
			{
				name: "TailwindCSS",
				imageSrc:
					"https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
				href: "https://tailwindcss.com/",
				purpose: "Styling your pages easily with pre-baked CSS classes",
			},
			{
				name: "HeroUI",
				imageSrc:
					"https://raw.githubusercontent.com/heroui-inc/heroui/main/apps/docs/public/isotipo.png",
				href: "https://www.heroui.com/",
				purpose: "Component library",
			},
			{
				name: "Zustand",
				imageSrc:
					"https://github.com/pmndrs/zustand/blob/main/examples/demo/src/resources/bear.png?raw=true",
				href: "https://zustand-demo.pmnd.rs/",
				purpose: "Front-end state with LocalStorage persisting",
			},
			{
				name: "NextThemes",
				imageSrc: "https://avatars.githubusercontent.com/u/34928425?v=4",
				href: "https://github.com/pacocoursey/next-themes",
				purpose: "Easy Dark/Light/System mode",
			},
			{
				name: "Zod",
				imageSrc:
					"https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=640&q=100",
				href: "https://zod.dev/",
				purpose: "Schema validation for APIs",
			},
			{
				name: "Phosphor",
				imageSrc:
					"https://github.com/phosphor-icons/homepage/blob/master/meta/phosphor-mark-tight-acid.png?raw=true",
				href: "https://phosphoricons.com/",
				purpose: "Icon library",
			},
			{
				name: "Biome",
				imageSrc:
					"https://biomejs.dev/_astro/logo-light-transparent.D-4iVN_O.svg",
				href: "https://biomejs.dev/",
				purpose: "Formatter & linter",
			},
			{
				name: "Prisma",
				href: "https://www.prisma.io/orm",
				imageSrc: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
				purpose: "Database ORM",
			},
		];
	}),
});

export type AppRouter = typeof router;
