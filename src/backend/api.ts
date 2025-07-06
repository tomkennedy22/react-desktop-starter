import { initTRPC } from "@trpc/server";
import { shell } from "electron";
import z from "zod";

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
});

export type AppRouter = typeof router;
