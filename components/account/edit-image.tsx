"use client";

import { updateAvatar } from "@/actions/account";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth.client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileUpload } from "../file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function EditAvatar() {
	const auth = useSession();
	const { toast } = useToast();
	const [edit, setEdit] = useState(false);
	const [uploading, setUploading] = useState(false);
	const router = useRouter();

	return (
		<div className="flex items-center justify-between">
			<div>
				<h3>Profile image</h3>
				<p className="text-sm text-muted-foreground">
					Upload your own image as your avatar
				</p>
			</div>
			{edit ? (
				<div>
					<FileUpload
						className="h-24 w-24 truncate"
						accept="image/*"
						disabled={uploading}
						maxSize={4 * 1024 * 1024}
						onSuccess={async (url) => {
							setUploading(true);
							try {
								const { error, message } = await updateAvatar(url);
								if (error) {
									toast({
										title: "Something went wrong",
										description: error,
										variant: "destructive",
									});
								}
								toast({
									title: "Upload successful",
									description: message,
								});
								router.refresh();
							} catch (error) {
								console.error(error);
								toast({
									title: "Something went wrong",
									description: "Internal server error",
									variant: "destructive",
								});
							} finally {
								setUploading(false);
								setEdit(false);
							}
						}}
						onError={(e) => {
							toast({
								title: "Something went wrong",
								description: e,
								variant: "destructive",
							});
						}}
					/>
					<p className="text-xs text-muted italic">Max size: 4mb</p>
				</div>
			) : (
				<div className="relative rounded-full">
					<Avatar className="h-24 w-24">
						<AvatarImage src={auth.data?.user.image ?? ""} />
						<AvatarFallback>{auth.data?.user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<Button
						className="absolute top-0 right-0 hover:bg-transparent/30"
						size={"icon"}
						variant={"ghost"}
						onClick={() => setEdit(true)}
					>
						<Edit />
					</Button>
				</div>
			)}
		</div>
	);
}
