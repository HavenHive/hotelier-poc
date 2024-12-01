import { SignInCard } from "@/components/auth/login";
import { SignUpCard } from "@/components/auth/signup";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Log in, sign up to continue with your account",
};

export default async function Page({
	searchParams,
}: { searchParams: Promise<{ error?: string }> }) {
	const { error } = await searchParams;
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
			{error ? (
				<Card>
					<CardHeader className="text-destructive">
						<CardTitle>Error signing you in</CardTitle>
						<CardDescription>Error: {error}</CardDescription>
					</CardHeader>
					<CardContent className="text-destructive-foreground">
						Please reload and try again. If this persists, please email us at{" "}
						<Link
							className="hover:underline"
							href={"mailto:support@hotlier.com"}
						>
							support@hotelier.com
						</Link>
					</CardContent>
				</Card>
			) : (
				<Tabs defaultValue="login" className="w-full max-w-sm">
					<TabsList className="w-full">
						<TabsTrigger className="w-full" value="login">
							Log in
						</TabsTrigger>
						<TabsTrigger className="w-full" value="signup">
							Sign up
						</TabsTrigger>
					</TabsList>
					<TabsContent value="signup">
						<SignUpCard />
					</TabsContent>
					<TabsContent value="login">
						<SignInCard />
					</TabsContent>
				</Tabs>
			)}
		</main>
	);
}
