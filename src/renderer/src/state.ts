import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
	count: number;
	inc: () => void;
};

export const useStore = create<Store>()(
	persist(
		(set) => ({
			count: 1,
			inc: () => set((state) => ({ count: state.count + 1 })),
		}),
		{ name: "position-storage" },
	),
);
