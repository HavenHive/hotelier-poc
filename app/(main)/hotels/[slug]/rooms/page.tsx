export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return <>Rooms and rooms management for your hotel with slug {slug}</>;
}
