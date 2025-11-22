import { Button, Divider, Tab, Tabs } from "@heroui/react";
import {
	GithubLogoIcon,
	MonitorIcon,
	MoonIcon,
	SunIcon,
} from "@phosphor-icons/react";
import { useApi } from "@renderer/api";
import type { ThemeColors } from "@renderer/types";
import { useMutation } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTheme } from "next-themes";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	console.log("Current path", window.location.pathname);

	const { resolvedTheme, theme, setTheme } = useTheme();
	const api = useApi();
	const openExternalLinkMutate = useMutation(
		api.triggerOpenExternalLink.mutationOptions(),
	);

	console.log("Current theme:", { theme, resolvedTheme });

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
				<div className="items-center py-px">
					<Tabs
						className="p-2"
						selectedKey={theme}
						onSelectionChange={(val) => setTheme(val as ThemeColors)}
					>
						<Tab key="dark" title={<MoonIcon size={20} />} />
						<Tab key="system" title={<MonitorIcon size={20} />} />
						<Tab key="light" title={<SunIcon size={20} />} />
					</Tabs>
					<Button
						isIconOnly
						className="rounded-full"
						onPressEnd={() => {
							openExternalLinkMutate.mutate({
								url: "https://github.com/tomkennedy22/react-desktop-starter",
							});
						}}
					>
						<GithubLogoIcon
							size={24}
							weight="fill"
							className="text-background"
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
