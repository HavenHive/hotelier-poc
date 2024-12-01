export default async function Page({
	params,
}: { params: Promise<{ slug: string; id: string }> }) {
	const { slug, id } = await params;
	return (
		<>
			Individual booking page for hotel with slug {slug} and booking with id{" "}
			{id}
		</>
	);
}
