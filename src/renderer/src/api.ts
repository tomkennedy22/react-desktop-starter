import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient } from "@trpc/react-query";
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../../backend/api';
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { ipcLink } from 'electron-trpc-experimental/renderer';


export const queryClient = new QueryClient();
export const trpcClient = createTRPCClient<AppRouter>({
    links: [ipcLink()],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
    client: trpcClient,
    queryClient,
});


export const { TRPCProvider, useTRPC: useApi, useTRPCClient } = createTRPCContext<AppRouter>();
