import { Button, Tab, Tabs } from "@heroui/react";
import {
	GithubLogoIcon,
	MonitorIcon,
	MoonIcon,
	SunIcon,
} from "@phosphor-icons/react";
import { ApiProvider } from "@renderer/ApiProvider";
import type { ThemeColors } from "@renderer/types";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTheme } from "next-themes";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const { resolvedTheme, theme, setTheme } = useTheme();

	console.log("Current theme:", { theme, resolvedTheme });

	return (
		<ApiProvider>
			<div className="flex justify-between">
				<div className="p-2 flex gap-2">
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>{" "}
					<Link to="/functionality" className="[&.active]:font-bold">
						Functionality
					</Link>
				</div>
				<div>
					<Tabs
						className="p-2"
						selectedKey={theme}
						onSelectionChange={(val) => setTheme(val as ThemeColors)}
					>
						<Tab key="dark" title={<MoonIcon size={20} />} />
						<Tab key="system" title={<MonitorIcon size={20} />} />
						<Tab key="light" title={<SunIcon size={20} />} />
					</Tabs>
					<Button isIconOnly className="rounded-full">
						<GithubLogoIcon
							size={24}
							weight="fill"
							className="text-background"
						/>
					</Button>
				</div>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</ApiProvider>
	);
}
