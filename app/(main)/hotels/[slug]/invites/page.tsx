export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return <>Managing invitations for hotel with slug {slug}</>;
}
