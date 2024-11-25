"use client";

import Apple from "@/assets/icons/apple";
import Linux from "@/assets/icons/linux";
import { useToast } from "@/hooks/use-toast";
import { listSessions, revokeSession, useSession } from "@/lib/auth.client";
import type { Session } from "better-auth";
import { Laptop, LogOut, RefreshCw, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Sessions() {
	const [loading, setLoading] = useState(false);
	const [sessions, setSessions] = useState<Session[] | null>(null);
	const { toast } = useToast();
	const auth = useSession();
	const data = async () => {
		setLoading(true);
		try {
			const { data, error } = await listSessions();
			if (error) {
				toast({
					title: "Something went wrong",
					description: error.message,
					variant: "destructive",
				});
			}
			setSessions(data);
		} catch (error) {
			toast({
				title: "Something went wrong",
				description: "Internal server error",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};
	const endSession = async (token: string) => {
		try {
			const { error } = await revokeSession({ token });
			if (error) {
				toast({
					title: "Something went wrong",
					description: error.message,
					variant: "destructive",
				});
			}
			setSessions((prev) =>
				prev ? prev.filter((p) => p.token !== token) : null,
			);
		} catch (error) {
			console.error(error);
			if (error) {
				toast({
					title: "Something went wrong",
					description: "Internal server error",
					variant: "destructive",
				});
			}
		}
	};
	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h3>Email verification</h3>
					<p className="text-sm text-muted-foreground">
						Verify your email to secure your account
					</p>
				</div>
				<div>
					{auth.data?.user.emailVerified === true ? (
						<p className="text-green-400 dark:text-green-600">
							Your email has been verified
						</p>
					) : (
						<p className="text-destructive">
							Your email hasn't been verified. Click{" "}
							<Link href={"/auth/verify"}>
								<Button variant={"link"} size={"sm"}>
									here
								</Button>
							</Link>{" "}
							to verify.
						</p>
					)}
				</div>
			</div>
			<Separator className="my-4" />
			<div>
				<div className="flex items-center justify-between">
					<h2>Get active devices</h2>
					<Button size={"icon"} onClick={data} disabled={loading}>
						{loading ? (
							<RefreshCw className="w-4 h-4 animate-spin" />
						) : (
							<RefreshCw className="w-4 h-4" />
						)}
					</Button>
				</div>
				{sessions?.map((s) => (
					<div
						className="flex items-center justify-between p-4 my-2 border rounded-lg"
						key={s.id}
					>
						{s.userAgent?.toLowerCase().includes("mobile") ||
						s.userAgent?.toLowerCase().includes("android") ||
						s.userAgent?.toLowerCase().includes("iphone") ? (
							<Smartphone className="w-5 h-5" />
						) : s.userAgent?.toLowerCase().includes("mac") ||
							s.userAgent?.toLowerCase().includes("apple") ? (
							<Apple className="w-5 h-5" />
						) : s.userAgent?.toLowerCase().includes("linux") ? (
							<Linux className="w-5 h-5" />
						) : (
							<Laptop className="w-5 h-5" />
						)}
						<span className="text-xs text-muted-foreground">
							IP: {s.ipAddress} • Last signed in:{" "}
							{new Date(s.updatedAt).toLocaleString()}
						</span>
						{s.id === auth.data?.session.id && <Badge>Current</Badge>}
						{s.id !== auth.data?.session.id && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button size={"icon"} variant={"destructive"}>
										<LogOut />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Sign out of device?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. You will have to sign in
											afresh in that device
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => endSession(s.token)}>
											End session
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
				))}
			</div>
		</>
	);
}
