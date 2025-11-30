import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "./ApiProvider";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { routeTree } from "./routeTree.gen";

const memoryHistory = createMemoryHistory({
	initialEntries: ["/"],
});

const router = createRouter({
	routeTree,
	history: memoryHistory,
	defaultPreload: "intent",
	defaultErrorComponent: DefaultCatchBoundary,
	defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement?.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ApiProvider>
				<RouterProvider router={router} />
			</ApiProvider>
		</StrictMode>,
	);
}
