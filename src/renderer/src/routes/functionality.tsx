import {
	Button,
	Card,
	CardBody,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
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
	component: FunctionalityPage,
});

function FunctionalityPage() {
	console.log("Current path", window.location.pathname);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { count, inc } = useStore();

	const [pongResponses, setPongResponses] = useState<PongResponse[]>([]);

	const api = useApi();
	const pingMutation = useMutation(api.triggerPing.mutationOptions());

	return (
		<>
			<div className="w-full grid grid-cols-[repeat(auto-fit,minmax(40rem,1fr))] gap-2">
				<Card>
					<CardBody className="">
						<p>
							Please try pressing <code>F12</code> to open the devTool
						</p>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="">
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
					</CardBody>
				</Card>
				<Card>
					<CardBody className="">
						<Button
							color="primary"
							onPressEnd={async () => {
								onOpen();
							}}
						>
							Open modal for fun
						</Button>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="">
						<Button
							color="primary"
							onPressEnd={async () => {
								const pingResult = await pingMutation.mutateAsync();
								setPongResponses((prev) => [...prev, pingResult]);
							}}
						>
							Test Ping API
						</Button>
						{pongResponses.length > 0 && (
							<Table>
								<TableHeader>
									<TableColumn>Response</TableColumn>
									<TableColumn>Time</TableColumn>
								</TableHeader>
								<TableBody items={pongResponses}>
									{(pongResponse) => (
										<TableRow
											key={`pong-response-${pongResponse.pongUuid}`}
											className="hover:bg-gray-100"
										>
											<TableCell>{pongResponse.message}</TableCell>
											<TableCell>{pongResponse.eventTime}</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						)}
					</CardBody>
				</Card>
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
		</>
	);
}
