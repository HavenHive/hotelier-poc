export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return <>Staff for your hotel with slug {slug}</>;
}
