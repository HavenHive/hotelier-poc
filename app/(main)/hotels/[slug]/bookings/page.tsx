export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<>
			Bookings Page for managing check in and check out for hotel with slug{" "}
			{slug}
		</>
	);
}
