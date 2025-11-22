import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCProxyClient } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { ipcLink } from "electron-trpc-experimental/renderer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppRouter } from "../../backend/api";
import { queryClient, TRPCProvider, trpcClient } from "./api";
import { themeColors } from "./utils";

export const client = createTRPCProxyClient({
	links: [ipcLink()],
});

type TRPCReact = ReturnType<typeof createTRPCReact<AppRouter>>;

export const trpcReact: TRPCReact = createTRPCReact<AppRouter>();

export type ApiInputTypes = inferRouterInputs<AppRouter>;
export type ApiReturnTypes = inferRouterOutputs<AppRouter>;

export const ApiProvider = ({ children }) => {
	return (
		<HeroUIProvider>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem={true}
				themes={themeColors}
			>
				<ToastProvider />
				<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
					<QueryClientProvider client={queryClient}>
						{children}
					</QueryClientProvider>
				</TRPCProvider>
			</NextThemesProvider>
		</HeroUIProvider>
	);
};
