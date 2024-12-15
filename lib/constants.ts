import {
	BookUp2,
	Boxes,
	Building,
	Calendar,
	CreditCard,
	FileChartPie,
	Home,
	Mailbox,
	Settings2,
	SquareKanban,
	Users,
	UsersRound,
} from "lucide-react";

export const getRoutes = (role: string, slug?: string) => ({
	navMain: [
		{
			title: "Home",
			url: "/",
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
							title: "Invites",
							url: `/hotels/${slug}/invites`,
							icon: Mailbox,
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

export const reverseSlug = (slug: string) => {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
