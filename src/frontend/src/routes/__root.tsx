import { useApi } from "@frontend/api";
import { Button, Divider, Image, Tab, Tabs } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ThemeColors } from "@types";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import GithubSvg from "../../../../resources/github-mark.svg";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const { resolvedTheme, theme, setTheme } = useTheme();
	const api = useApi();
	const openExternalLinkMutate = useMutation(
		api.triggerOpenExternalLink.mutationOptions(),
	);

	return (
		<div className={resolvedTheme}>
			<div className="flex justify-between px-8">
				<div className="flex gap-2 items-center">
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>
					<Link to="/functionality" className="[&.active]:font-bold">
						Functionality
					</Link>
					<Link to="/countries" className="[&.active]:font-bold">
						Countries
					</Link>
				</div>
				<div className="items-center py-px flex">
					<Tabs
						className="p-2"
						selectedKey={theme}
						onSelectionChange={(val) => setTheme(val as ThemeColors)}
					>
						<Tab key="dark" title={<Moon size={20} />} />
						<Tab key="system" title={<Monitor size={20} />} />
						<Tab key="light" title={<Sun size={20} />} />
					</Tabs>
					<Button
						isIconOnly
						className="rounded-lg p-1 bg-white"
						onPressEnd={() => {
							openExternalLinkMutate.mutate({
								url: "https://github.com/tomkennedy22/react-desktop-starter",
							});
						}}
					>
						<Image
							removeWrapper
							src={GithubSvg}
							className="text-foreground h-full w-full object-scale-down"
						/>
					</Button>
				</div>
			</div>
			<Divider />
			<div className="px-8 py-4">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</div>
	);
}
