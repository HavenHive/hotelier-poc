"use client";

import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth.client";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Submit } from "../submit";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { GoogleButton } from "./google";

export function SignInCard() {
	const router = useRouter();
	const { toast } = useToast();
	const submit = async (form: FormData) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		try {
			await signIn.email(
				{
					email,
					password,
					callbackURL: "/account",
				},
				{
					onError: (ctx) => {
						toast({
							title: "Something went wrong",
							description: ctx.error.message,
							variant: "destructive",
						});
					},
				},
			);
		} catch (error) {
			console.error(error);
			toast({
				title: "Something went wrong",
				description: "Internal server error",
				variant: "destructive",
			});
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Log in</CardTitle>
				<CardDescription>Log in to your account to continue</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2">
				<Form action={submit} className="grid gap-4">
					<div className="grid gap-1">
						<Label htmlFor="email">Email address</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="email@company.com"
							autoComplete="email"
						/>
					</div>
					<div className="grid gap-1">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href={"/auth/reset"}
								className="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</Link>
						</div>
						<Input
							type="password"
							id="password"
							name="password"
							autoComplete="new-password"
							min={8}
							max={32}
						/>
					</div>
					<Submit>Log in</Submit>
				</Form>
				<GoogleButton />
			</CardContent>
		</Card>
	);
}
