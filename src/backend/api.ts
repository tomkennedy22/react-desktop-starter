import { initTRPC } from "@trpc/server";
import z from "zod";

const t = initTRPC.create({ isServer: true });

export const router = t.router({
	triggerPing: t.procedure.mutation(() => {
		console.log("triggerPing called");

		const pongUuid = crypto.randomUUID();

		return { message: "pong test3", pongUuid };
	}),
	greeting: t.procedure.input(z.object({ name: z.string() })).query((req) => {
		const { input } = req;

		return {
			text: `Hello ${input.name}` as const,
		};
	}),
});

export type AppRouter = typeof router;
