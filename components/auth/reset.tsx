"use client";

import { useToast } from "@/hooks/use-toast";
import { forgetPassword, resetPassword, useSession } from "@/lib/auth.client";
import { TriangleAlert } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Submit } from "../submit";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ForgotPassword({
	error,
}: {
	error?: "invalid_token" | string | undefined;
}) {
	const auth = useSession();
	const { toast } = useToast();
	const router = useRouter();
	const sendMail = async (form: FormData) => {
		try {
			const email = form.get("email") as string;
			await forgetPassword(
				{ email, redirectTo: "/auth/reset" },
				{
					onSuccess: () => {
						toast({
							title: "Email sent",
							description: "Check your mail to continue the process",
						});
					},
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
	const reset = async (form: FormData) => {
		const newPassword = form.get("password") as string;
		try {
			await resetPassword(
				{
					newPassword,
				},
				{
					onSuccess: () => {
						toast({
							title: "Success",
							description: "Password changed successfully",
						});
						router.push("/account");
					},
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
				<CardTitle>Reset your password</CardTitle>
				<CardDescription>Reset your password to continue</CardDescription>
			</CardHeader>
			<CardContent>
				{error ? (
					<div className="flex flex-col items-center">
						<TriangleAlert size={35} className="text-destructive" />
						<h3>Something went wrong</h3>
						<p>
							{error === "invalid_token"
								? "The token is invalid or expired"
								: "Please try again"}
						</p>
						<Link href="/auth">
							<Button>Log in</Button>
						</Link>
					</div>
				) : auth.data?.user ? (
					<form action={reset} className="grid gap-4">
						<div className="grid gap-1">
							<Label htmlFor="password">New password</Label>
							<Input
								id="password"
								name="password"
								autoComplete="new-password"
								required
								min={6}
								max={32}
							/>
						</div>
						<Submit>Reset password</Submit>
					</form>
				) : (
					<Form action={sendMail} className="grid gap-4">
						<div className="grid gap-1">
							<Label htmlFor="email">Your account's email address</Label>
							<Input
								id="email"
								type="email"
								name="email"
								autoComplete="email"
								required
							/>
						</div>
						<Submit>Send email</Submit>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}
