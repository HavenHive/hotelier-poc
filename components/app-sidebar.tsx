"use client";

import { getRoutes } from "@/lib/constants";
import { useParams } from "next/navigation";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth.client";
import { Skeleton } from "./ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const auth = useSession();
	const { isPending, data } = auth;
	const params = useParams();
	const slug = params?.slug as string | undefined;
	if (isPending) {
		<SidebarSkeleton />;
	}
	const role = data?.user?.role as "owner" | "admin" | "member" | "user";
	const routes = getRoutes(role, slug);
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={routes.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

function SidebarSkeleton({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<Skeleton className="h-10 w-full" />
			</SidebarHeader>
			<SidebarContent>
				<div className="space-y-4 p-4">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-3/5" />
				</div>
				<div className="mt-6 space-y-4 p-4">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</SidebarContent>
			<SidebarFooter>
				<Skeleton className="h-10 w-full" />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
