import { useApi } from "@frontend/api";
import { CreatePersonFormModal } from "@frontend/components/CreatePersonForm";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash } from "lucide-react";

export const Route = createFileRoute("/countries/$countryIdStr")({
	component: RouteComponent,
});

function RouteComponent() {
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
										<Trash size={16} />
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
										<Plus size={16} />
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
