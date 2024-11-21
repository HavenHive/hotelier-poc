"use client";

import { useListOrganizations, useSession } from "@/lib/auth.client";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function Organization() {
	const { data, error } = useListOrganizations();
	return (
		<div>
			Your organizations
			{data ? (
				data.length > 0 ? (
					data.map((org) => (
						<div className="flex items-center gap-2" key={org.id}>
							<Avatar>
								<AvatarImage src={org.logo ?? ""} />
								<AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-2">
								<h2>{org.name}</h2>
							</div>
						</div>
					))
				) : (
					<div className="flex items-center justify-center h-auto gap-2">
						<h2>You currently do not have an organization</h2>
						<Button>Create one</Button>
					</div>
				)
			) : error ? (
				<div className="flex items-center justify-center h-auto gap-2">
					<h2>Failed to load organization details</h2>
					<p className="text-muted-foreground">Error: {error.message}</p>
				</div>
			) : (
				<div className="flex items-center justify-center h-auto">
					<Loader className="animate-spin" size={30} />
				</div>
			)}
		</div>
	);
}
