"use client";

import { ChevronsUpDown, Plus, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import {
	organization,
	useActiveOrganization,
	useListOrganizations,
} from "@/lib/auth.client";
import { useAccountStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreateOrg } from "./create-org";

export function TeamSwitcher() {
	const { toggle, isPersonal } = useAccountStore();
	const { isMobile } = useSidebar();
	const { data: organizations } = useListOrganizations();
	const { data } = useActiveOrganization();
	const router = useRouter();
	const { toast } = useToast();

	const switchOrg = async (id: string) => {
		try {
			await organization.setActive(
				{ organizationId: id },
				{
					onError: (ctx) => {
						toast({
							title: "Something went wrong",
							description: ctx.error.message,
							variant: "destructive",
						});
					},
					onSuccess: () => {
						toggle();
						toast({
							title: "Organization switched successfully",
						});
						router.push(`/org/${id}`);
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

	const personal = {
		name: "Personal",
		logo: () => <UserRound className="size-4" />,
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{isPersonal ? (
									<UserRound className="size-4" />
								) : data?.logo ? (
									<Image
										src={data.logo}
										alt="Logo"
										className="aspect-square rounded-lg"
										width={150}
										height={150}
									/>
								) : (
									<UserRound className="size-4" />
								)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{isPersonal ? personal.name : data?.name}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Organizations
						</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								router.push("/account");
								toggle();
							}}
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<UserRound className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{personal.name}</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{organizations?.map((org, index) => (
							<DropdownMenuItem
								key={org.id}
								onClick={() => switchOrg(org.id)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									{org.logo ? (
										<Image
											src={org.logo}
											alt="Logo"
											width={150}
											height={150}
											className="aspect-square shrink-0"
										/>
									) : (
										<UserRound className="size-4 shrink-0" />
									)}
								</div>
								{org.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<CreateOrg variant={"ghost"} className="gap-2 p-2 w-full">
								<div className="flex size-6 items-center justify-center rounded-md border bg-background">
									<Plus className="size-4" />
								</div>
								<span className="font-medium text-muted-foreground">
									Add organization
								</span>
							</CreateOrg>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
