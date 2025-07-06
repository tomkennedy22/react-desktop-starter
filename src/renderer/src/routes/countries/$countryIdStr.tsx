import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { TrashIcon } from "@phosphor-icons/react";
import { useApi } from "@renderer/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/countries/$countryIdStr")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const api = useApi();

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

	const triggerDeletePerson = useMutation(
		api.triggerDeletePerson.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: api.getCountry.queryKey({ countryId }),
				});
			},
		}),
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
					{(country.people || []).map((person) => (
						<TableRow key={`person-${person.personId}`}>
							<TableCell>{person.personId}</TableCell>
							<TableCell>{person.name}</TableCell>
							<TableCell>{country.name}</TableCell>
							<TableCell>
								<Button
									isIconOnly
									onPressEnd={async () => {
										await triggerDeletePerson.mutateAsync({
											personId: person.personId,
										});
									}}
								>
									<TrashIcon size={16} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
