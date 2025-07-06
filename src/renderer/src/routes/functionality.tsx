import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import type { ApiReturnTypes } from "@renderer/ApiProvider";
import { useApi } from "@renderer/api";
import { useStore } from "@renderer/state";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

type PongResponse = ApiReturnTypes["triggerPing"];

export const Route = createFileRoute("/functionality")({
	component: About,
});

function About() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { count, inc } = useStore();

	const [pongResponses, setPongResponses] = useState<PongResponse[]>([]);

	const api = useApi();
	const pingMutation = useMutation(api.triggerPing.mutationOptions());

	return (
		<div className="p-2">
			<p>
				Please try pressing <code>F12</code> to open the devTool
			</p>
			<Divider className="my-2" />
			<div>
				Try this button to test Zustand storage
				<Button
					color="primary"
					onPressEnd={() => {
						console.log("increment button clicked");
						inc();
					}}
				>
					{`Count: ${count}`}
				</Button>
			</div>
			<Divider className="my-2" />
			<div className="action">
				<Button
					color="primary"
					onPressEnd={async () => {
						console.log("ping button  clicked");
						const pingResult = await pingMutation.mutateAsync();
						setPongResponses((prev) => [...prev, pingResult]);
						console.log("ping result", pingResult);
					}}
				>
					Send IPC
				</Button>
				<Button
					color="primary"
					onPressEnd={async () => {
						onOpen();
					}}
				>
					Open modal for fun
				</Button>
			</div>
			<div>
				{pongResponses.length > 0 && (
					<div className="pong-responses">
						<h3>Pong Responses:</h3>
						<ul>
							{pongResponses.map((response) => (
								<li key={`pong-${response.pongUuid}`}>
									{response.message} - {response.pongUuid}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Modal Title
							</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Magna exercitation reprehenderit magna aute tempor cupidatat
									consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
									incididunt cillum quis. Velit duis sit officia eiusmod Lorem
									aliqua enim laboris do dolor eiusmod. Et mollit incididunt
									nisi consectetur esse laborum eiusmod pariatur proident Lorem
									eiusmod et. Culpa deserunt nostrud ad veniam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
