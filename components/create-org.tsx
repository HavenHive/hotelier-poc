"use client";

import { useToast } from "@/hooks/use-toast";
import { organization } from "@/lib/auth.client";
import { Building2, Plus } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { FileUpload } from "./file-upload";
import { Submit } from "./submit";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, type ButtonProps } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CreateOrg({
	children = (
		<>
			<Plus className="mr-2" />
			<Building2 />
		</>
	),
	className,
	variant,
	size,
}: ButtonProps) {
	const [open, setOpen] = useState(false);
	const [slug, setSlug] = useState("");
	const [fileUrl, setFileUrl] = useState("");
	const { toast } = useToast();
	const router = useRouter();
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value;
		const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
		setSlug(generatedSlug);
	};
	const create = async (form: FormData) => {
		const name = form.get("name") as string;
		const slug = form.get("slug") as string;

		try {
			await organization.create(
				{
					name,
					slug,
					logo: fileUrl,
				},
				{
					onError: (ctx) => {
						toast({
							title: "Something went wrong",
							description: ctx.error.message,
							variant: "destructive",
						});
					},
					onSuccess: () => {
						toast({
							title: "Success",
							description: "Organization created successfully",
						});
						router.refresh();
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
		} finally {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={variant} size={size} className={className}>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create your own organization</DialogTitle>
					<DialogDescription>
						Fill this form to create your own organization
					</DialogDescription>
				</DialogHeader>
				<Form action={create} className="grid gap-4">
					<div className="grid gap-1">
						<Label htmlFor="name">Organization name</Label>
						<Input
							id="name"
							name="name"
							placeholder="Your organization"
							required
							onChange={handleNameChange}
						/>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="name">Slug</Label>
						<Input
							id="slug"
							name="slug"
							placeholder="your organization slug"
							required
							value={slug}
							readOnly
						/>
					</div>
					<div className="grid gap-1">
						<Label htmlFor="logo">Organization logo</Label>
						{fileUrl && (
							<Avatar className="h-12 w-12">
								<AvatarImage src={fileUrl} />
								<AvatarFallback>{slug.charAt(0)}</AvatarFallback>
							</Avatar>
						)}
						<FileUpload
							className="h-40 w-40 place-self-center"
							accept="image/*"
							onSuccess={(url) => {
								toast({
									title: "Upload successful",
								});
								setFileUrl(url);
							}}
							onError={(e) => {
								toast({
									title: "Something went wrong. Please try again",
									description: e,
									variant: "destructive",
								});
							}}
						/>
					</div>
					<Submit>Create organization</Submit>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
