import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrgType {
	orgId: string | null;
	isDefaultAccount: boolean;
	toggle: (id?: string | null) => void;
}

export const useAccountStore = create<OrgType>()(
	persist(
		(set) => ({
			orgId: null,
			isDefaultAccount: true,
			toggle: (id?: string | null) =>
				set(() => ({
					orgId: id || null,
					isDefaultAccount: id === null,
				})),
		}),
		{
			name: "account-storage",
		},
	),
);
