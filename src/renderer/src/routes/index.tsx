import { Card, CardBody, Image } from "@heroui/react";
import { useApi } from "@renderer/api";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const sourceLinks = [
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
		imageSrc: "https://biomejs.dev/_astro/logo-light-transparent.D-4iVN_O.svg",
		href: "https://biomejs.dev/",
		purpose: "Formatter & linter",
	},
];

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const api = useApi();
	const openExternalLinkMutate = useMutation(
		api.triggerOpenExternalLink.mutationOptions(),
	);

	return (
		<div>
			<div className="text-xl font-semibold py-2">
				Build your best Desktop App with all of the modern web tooling!
			</div>
			<div className="w-full grid [grid-template-columns:repeat(auto-fit,_minmax(200px,_300px))] gap-2">
				{sourceLinks.map((link) => (
					<Card
						key={`link-${link.name}`}
						isPressable
						onPress={() => {
							if (link.href) {
								openExternalLinkMutate.mutate({
									url: link.href,
								});
							} else {
								console.warn(`No URL provided for ${link.name}`);
							}
						}}
					>
						<CardBody>
							<div className="flex justify-between items-center">
								<Image
									key={`img-${link.name}`}
									className="flex-1 aspect-auto object-scale-down p-2 w-24 h-24"
									src={link.imageSrc}
								/>
								<div className="flex-2 flex flex-col text-center">
									<div className="font-semibold">{link.name}</div>
									<div className="text-xs opacity-75">{link.purpose}</div>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}
