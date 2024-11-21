"use client";

import { ThemeToggle } from "../theme-toggle";
import { Separator } from "../ui/separator";
import { EditAvatar } from "./edit-image";
import { EditName } from "./edit-name";
import { Sessions } from "./sessions";

export function Profile() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<h2 className="text-xl font-semibold mb-2">
				Update your account settings
			</h2>
			<div className="flex flex-col gap-2">
				<EditName />
				<Separator className="my-4" />
				<EditAvatar />
				<Separator className="my-4" />
				<Sessions />
				<Separator className="my-4" />
				<ThemeToggle />
				<Separator className="my-4" />
			</div>
		</div>
	);
}
