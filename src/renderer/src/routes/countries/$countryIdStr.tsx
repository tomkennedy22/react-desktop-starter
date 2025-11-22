import {
	addToast,
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from "@heroui/react";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useApi } from "@renderer/api";
import { CreatePersonFormModal } from "@renderer/components/CreatePersonForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/countries/$countryIdStr")({
	component: RouteComponent,
});

function RouteComponent() {
	console.log("Current path", window.location.pathname);

	const queryClient = useQueryClient();
	const api = useApi();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { countryIdStr } = Route.useParams();
	const countryId = Number(countryIdStr);

	const { data: country, isLoading } = useQuery(
		api.getCountry.queryOptions(
			{
				countryId,
			},
			{ enabled: Boolean(countryId) },
		),
	);

	const triggerDeletePersonMutate = useMutation(
		api.triggerDeletePerson.mutationOptions(),
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!country) {
		return <div>Country not found</div>;
	}

	return (
		<div>
			<div>Showing based page for {country.name}</div>
			<Table>
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>Name</TableColumn>
					<TableColumn>Country</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No countries to display."}>
					{(country.people || [])
						.map((person) => (
							<TableRow key={`person-${person.personId}`}>
								<TableCell>{person.personId}</TableCell>
								<TableCell>{person.name}</TableCell>
								<TableCell>{country.name}</TableCell>
								<TableCell>
									<Button
										isIconOnly
										onPressEnd={async () => {
											await triggerDeletePersonMutate.mutateAsync({
												personId: person.personId,
											});

											queryClient.invalidateQueries({
												queryKey: api.getCountry.queryKey({ countryId }),
											});
											addToast({
												title: `Deleted ${person.name}`,
											});
										}}
									>
										<TrashIcon size={16} />
									</Button>
								</TableCell>
							</TableRow>
						))
						.concat(
							<TableRow key={"country-people-add-person-row"}>
								<TableCell>{null}</TableCell>
								<TableCell>{null}</TableCell>
								<TableCell>{null}</TableCell>
								<TableCell>
									<Button isIconOnly onPressEnd={onOpen}>
										<PlusIcon size={16} />
									</Button>
								</TableCell>
							</TableRow>,
						)}
				</TableBody>
			</Table>
			<CreatePersonFormModal
				isOpen={isOpen}
				onClose={onClose}
				countryId={countryId}
			/>
		</div>
	);
}
