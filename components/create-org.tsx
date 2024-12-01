"use client";

import { useToast } from "@/hooks/use-toast";
import { organization } from "@/lib/auth.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const organizationSchema = z.object({
	name: z.string().min(1, "Name is required"),
	slug: z.string().min(1, "Slug is required"),
	logo: z.string().optional(),
	metadata: z
		.object({
			description: z.string().optional(),
			website: z.string().url().optional().or(z.literal("")),
			phone: z.string().optional(),
			email: z.string().email().optional().or(z.literal("")),
			address: z.string().optional(),
			city: z.string().optional(),
			country: z.string().optional(),
			floors: z.number().optional(),
		})
		.optional(),
});

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
	const [step, setStep] = useState(0);
	const [slug, setSlug] = useState("");
	const [fileUrl, setFileUrl] = useState("");
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof organizationSchema>>({
		resolver: zodResolver(organizationSchema),
		defaultValues: {
			name: "",
			slug: "",
			logo: fileUrl,
			metadata: {
				description: "",
				website: "",
				phone: "",
				email: "",
				address: "",
				floors: 0,
			},
		},
	});
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value;
		form.setValue("name", name);
		const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
		setSlug(generatedSlug);
		form.setValue("slug", generatedSlug);
	};
	const create = async (values: z.infer<typeof organizationSchema>) => {
		try {
			const cleanedValues = {
				...values,
				metadata: {
					...values.metadata,
					website: values.metadata?.website || undefined,
					email: values.metadata?.email || undefined,
				},
			};
			await organization.create(cleanedValues, {
				onError: (ctx) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message,
						variant: "destructive",
					});
					return;
				},
				onSuccess: (ctx) => {
					toast({
						title: "Success",
						description: "Organization created successfully",
					});
					router.push(`/hotels/${ctx.data?.slug}`);
				},
			});
		} catch (error) {
			console.error("Creation error:", error);
			toast({
				title: "Something went wrong",
				description:
					error instanceof Error ? error.message : "Internal server error",
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
						Fill this form to create your organization
					</DialogDescription>
				</DialogHeader>
				{step === 0 ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setStep((prev) => prev + 1);
						}}
						className="grid gap-4"
					>
						<div className="grid gap-1">
							<Label htmlFor="name">Organization name</Label>
							<Input
								id="name"
								placeholder="Your organization"
								required
								onChange={handleNameChange}
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="name">Slug</Label>
							<Input
								id="slug"
								placeholder="Your organization slug"
								required
								readOnly
								value={form.getValues("slug")}
							/>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="logo">Organization logo</Label>
							{fileUrl ? (
								<Avatar className="h-12 w-12">
									<AvatarImage src={fileUrl} />
									<AvatarFallback>
										{slug.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							) : (
								<FileUpload
									className="h-40 w-40 place-self-center"
									accept="image/*"
									onSuccess={(url) => {
										toast({
											title: "Upload successful",
										});
										form.setValue("logo", url);
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
							)}
						</div>
						<Button type="submit">Next →</Button>
					</form>
				) : (
					<Form {...form}>
						<form className="grid gap-4" onSubmit={form.handleSubmit(create)}>
							<FormField
								className="grid gap-1"
								name="metadata.description"
								label="Organization description"
								render={({ field }) => (
									<Textarea
										{...field}
										placeholder="A bio for your organization, could be your slogan or other details you would like to add"
									/>
								)}
							/>
							<FormField
								className="grid gap-1"
								name="metadata.website"
								label="Website url"
								render={({ field }) => (
									<Input
										{...field}
										type="url"
										placeholder="https://example.com"
									/>
								)}
							/>
							<FormField
								className="grid gap-1"
								name="metadata.phone"
								label="Organization phone number if available"
								render={({ field }) => <Input {...field} type="tel" />}
							/>
							<FormField
								className="grid gap-1"
								name="metadata.email"
								label="Organization support email address if available"
								render={({ field }) => <Input {...field} type="email" />}
							/>
							<FormField
								className="grid gap-1"
								name="metadata.address"
								label="Organization address"
								render={({ field }) => <Input {...field} />}
							/>
							<FormField
								className="grid gap-1"
								name="metadata.floors"
								label="Organization floors"
								render={({ field }) => (
									<Input
										{...field}
										type="number"
										onChange={(e) =>
											field.onChange(Number(e.target.value) || 0)
										}
									/>
								)}
							/>
							<Submit>Create organization</Submit>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
}
