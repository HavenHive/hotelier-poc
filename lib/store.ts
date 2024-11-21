import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccountType {
	isPersonal: boolean;
	toggle: () => void;
}

export const useAccountStore = create<AccountType>()(
	persist(
		(set) => ({
			isPersonal: true,
			toggle: () => set((state) => ({ isPersonal: !state.isPersonal })),
		}),
		{
			name: "account-storage",
		},
	),
);
