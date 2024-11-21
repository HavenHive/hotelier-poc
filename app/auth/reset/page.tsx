import { ForgotPassword } from "@/components/auth/reset";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Authentication",
		default: "Reset Password",
	},
	description: "Reset your password to continue",
};

export default async function Page({
	searchParams,
}: { searchParams: Promise<{ error?: string }> }) {
	const { error } = await searchParams;
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
			<ForgotPassword error={error} />
		</main>
	);
}
