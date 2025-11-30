import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppRouter } from "../backend/api";
import { themeColors } from "../utils";
import { queryClient, TRPCProvider, trpcClient } from "./api";

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
