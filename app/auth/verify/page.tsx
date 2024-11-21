import { VerifyEmail } from "@/components/auth/verify";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Authentication",
		default: "Email Verification",
	},
	description: "Verify your email to continue",
};

export default async function Page({
	searchParams,
}: { searchParams: Promise<{ code?: string }> }) {
	const { code } = await searchParams;
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
			<VerifyEmail code={code} />
		</main>
	);
}
