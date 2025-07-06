import { Card, CardBody, Image, image } from "@heroui/react";
import { useApi } from "@renderer/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const api = useApi();
	const openExternalLinkMutate = useMutation(
		api.triggerOpenExternalLink.mutationOptions(),
	);

	const { data: credits } = useQuery(api.getCredits.queryOptions());

	return (
		<div>
			<div className="text-xl font-semibold py-2">
				Build your best Desktop App with all of the modern web tooling!
			</div>
			<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2">
				{credits?.map((link) => (
					<Card
						key={`link-${link.name}`}
						isPressable
						onPress={() => {
							if (link.href) {
								openExternalLinkMutate.mutate({
									url: link.href,
								});
							} else {
								console.warn(`No URL provided for ${link.name}`);
							}
						}}
					>
						<CardBody>
							<div className="flex justify-between items-center">
								<Image
									removeWrapper
									key={`img-${link.name}`}
									className="flex-1 aspect-auto object-scale-down p-2 h-24 w-24"
									src={link.imageSrc}
								/>
								<div className="flex-2 flex flex-col text-center">
									<div className="font-semibold">{link.name}</div>
									<div className="text-xs opacity-75">{link.purpose}</div>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}
