export default function Loading() {
	return (
		<>
			<header className="sticky top-0 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<div className="h-9 w-9 animate-pulse rounded-md bg-muted" />
					<div className="h-4 w-[1px] animate-pulse bg-muted" />
					<div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
				<div className="flex flex-col gap-2">
					<div className="h-10 w-full animate-pulse rounded-md bg-muted" />
					<div className="my-4 h-[1px] w-full animate-pulse bg-muted" />
					<div className="h-32 w-full animate-pulse rounded-md bg-muted" />
					<div className="my-4 h-[1px] w-full animate-pulse bg-muted" />
					<div className="h-48 w-full animate-pulse rounded-md bg-muted" />
					<div className="my-4 h-[1px] w-full animate-pulse bg-muted" />
					<div className="h-10 w-full animate-pulse rounded-md bg-muted" />
					<div className="my-4 h-[1px] w-full animate-pulse bg-muted" />
				</div>
			</div>
		</>
	);
}
