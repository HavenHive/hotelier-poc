import { SignInCard } from "@/components/auth/login";
import { SignUpCard } from "@/components/auth/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Log in, sign up to continue with your account",
};

export default async function Page() {
	return (
		<main className="flex h-screen w-full items-center justify-center px-4">
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
		</main>
	);
}
