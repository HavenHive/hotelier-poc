"use client";

import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/auth.client";
import Form from "next/form";
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

export function SignUpCard() {
	const router = useRouter();
	const { toast } = useToast();
	const submit = async (form: FormData) => {
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		const name = form.get("name") as string;
		try {
			await signUp.email(
				{
					email,
					password,
					name,
				},
				{
					onError: (ctx) => {
						toast({
							title: "Something went wrong",
							description: ctx.error.message,
							variant: "destructive",
						});
					},
					onSuccess: () => router.push("/auth/verify"),
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
				<CardTitle>Sign up</CardTitle>
				<CardDescription>Sign up to your account to continue</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2">
				<Form action={submit} className="grid gap-4">
					<div className="grid gap-1">
						<Label htmlFor="name">Full name</Label>
						<Input id="name" name="name" autoComplete="name" min={3} />
					</div>
					<div className="grid gap-1">
						<Label htmlFor="email">Email address</Label>
						<Input id="email" name="email" autoComplete="email" type="email" />
					</div>
					<div className="grid gap-1">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
						/>
					</div>
					<Submit>Sign up</Submit>
				</Form>
				<GoogleButton />
			</CardContent>
		</Card>
	);
}
