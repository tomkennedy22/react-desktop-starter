import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, createTRPCReact } from "@trpc/react-query";
import {
	createTRPCContext,
	createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import { ipcLink } from "electron-trpc-experimental/renderer";
import type { AppRouter } from "../backend/api";

type TRPCReact = ReturnType<typeof createTRPCReact<AppRouter>>;

const trpcReact: TRPCReact = createTRPCReact<AppRouter>();

const queryClient = new QueryClient();

const links = [ipcLink()];

const trpcClient = createTRPCClient<AppRouter>({
	links,
});

const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});

const {
	TRPCProvider,
	useTRPC: useApi,
	useTRPCClient,
} = createTRPCContext<AppRouter>();

export {
	TRPCProvider,
	useApi,
	useTRPCClient,
	queryClient,
	trpcClient,
	trpc,
	trpcReact,
};
