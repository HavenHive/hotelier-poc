import {
	BookUp2,
	Boxes,
	Building,
	Calendar,
	CreditCard,
	FileChartPie,
	Home,
	Settings2,
	SquareKanban,
	Users,
	UsersRound,
} from "lucide-react";

export const getRoutes = (role: string, slug?: string) => ({
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: Home,
		},
		{
			title: "Hotels",
			url: "/hotels",
			icon: Building,
			items: slug
				? [
						{
							title: "Overview",
							url: `/hotels/${slug}`,
							icon: SquareKanban,
						},
						{
							title: "Rooms",
							url: `/hotels/${slug}/rooms`,
							icon: Boxes,
						},
						{
							title: "Bookings",
							url: `/hotels/${slug}/bookings`,
							icon: BookUp2,
						},
						{
							title: "Staff",
							url: `/hotels/${slug}/staff`,
							icon: UsersRound,
						},
						{
							title: "Reports",
							url: `/hotels/${slug}/report`,
							icon: FileChartPie,
						},
						{
							title: "Settings",
							url: `/hotels/${slug}/settings`,
							icon: Settings2,
						},
					]
				: undefined,
		},
		...(role === "owner" || role === "admin"
			? [
					{
						title: "Users",
						url: "/users",
						icon: Users,
					},
				]
			: []),
		{
			title: "Activity",
			url: "/activity",
			icon: Calendar,
		},
		...(role === "owner"
			? [
					{
						title: "Billing",
						url: "/billing",
						icon: CreditCard,
					},
				]
			: []),
	],
});
