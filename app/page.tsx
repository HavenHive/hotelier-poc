import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<span className="flex text-xl gap-4">
				<h2 className="font-extrabold text-4xl tracking-wider text-pretty">
					PoC
				</h2>{" "}
				for <h3 className="font-semibold text-3xl text-pretty">Betta-Rest</h3>
			</span>
			Click here to continue
			<Button variant={"link"}>
				<Link href="/account">continue</Link>
			</Button>
			<span className="mt-4">
				A WIP for testing the concept and features of an hotel management system
			</span>
			<span className="text-xs mt-10 italic">
				For internal use only. All Rights Reserved
			</span>
		</main>
	);
}
