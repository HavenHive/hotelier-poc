"use client";

import { updateName } from "@/actions/account";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth.client";
import { Edit, Save } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Submit } from "../submit";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function EditName() {
	const auth = useSession();
	const { toast } = useToast();
	const [edit, setEdit] = useState(false);
	const router = useRouter();
	const editName = async (form: FormData) => {
		try {
			const name = form.get("name") as string;
			const { error, message } = await updateName(name);
			if (error) {
				toast({
					title: "Something went wrong",
					description: error,
					variant: "destructive",
				});
				return;
			}
			toast({
				title: "Success",
				description: message,
			});
			setEdit(false);
			router.refresh();
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
		<div className="flex items-center justify-between">
			<div>
				<h3>Full name</h3>
				<p className="text-sm text-muted-foreground">
					This is the name that will be displayed in your profile and emails
				</p>
			</div>
			{edit ? (
				<Form action={editName} className="flex items-center gap-2">
					<Input
						id="name"
						name="name"
						autoComplete="name"
						value={auth.data?.user.name}
						required
					/>
					<Submit size={"icon"}>
						<Save />
					</Submit>
				</Form>
			) : (
				<div className="flex items-center gap-2">
					<p className="font-semibold">{auth.data?.user.name}</p>
					<Button size="icon" variant={"ghost"} onClick={() => setEdit(true)}>
						<Edit />
					</Button>
				</div>
			)}
		</div>
	);
}
