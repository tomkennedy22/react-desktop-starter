import {
	addToast,
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
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
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/countries/$countryIdStr")({
	component: RouteComponent,
});

const personSchema = z.object({
	name: z.string().min(1, "Name must not be empty"),
	countryId: z.number().min(1, "Country ID must be valid"),
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

	const triggerCreatePersonMutate = useMutation(
		api.triggerCreatePerson.mutationOptions(),
	);

	const form = useForm({
		defaultValues: {
			name: "",
			countryId,
		},
		validators: {
			onMount: personSchema,
			onChange: personSchema,
		},
		onSubmit: async ({ value: person }) => {
			console.log(person);

			const isFormValid = await form.validateAsync("submit");

			if (isFormValid) {
				await triggerCreatePersonMutate.mutateAsync(person);
				queryClient.invalidateQueries({
					queryKey: api.getCountry.queryKey({ countryId }),
				});
				addToast({
					title: `Created ${person.name}`,
				});
			}
		},
	});

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
			<Modal isOpen={isOpen} size="xs" onClose={onClose}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add Person
							</ModalHeader>
							<ModalBody>
								<Form
									// validationErrors={form.validateAllFields()}
									className="w-full max-w-xs"
									onSubmit={() => form.handleSubmit()}
								>
									<form.Field
										name="name"
										validators={{ onChange: personSchema.shape.name }}
									>
										{(field) => (
											<>
												<Input
													isRequired
													isInvalid={
														field.state.meta.isTouched &&
														!field.state.meta.isValid
													}
													errorMessage={() => {
														return field.state.meta.errors.map(
															(error) => error?.message,
														);
													}}
													onChange={(e) => {
														field.handleChange(e.target.value);
													}}
													onBlur={field.handleBlur}
													label="Name"
													labelPlacement="outside"
													placeholder="Enter person name"
													type="text"
													id={field.name}
													name={field.name}
													value={field.state.value}
												/>
											</>
										)}
									</form.Field>
									<form.Subscribe
										selector={(state) => {
											console.log("Form state:", state);
											return [state.canSubmit, state.isSubmitting];
										}}
									>
										{([canSubmit, isSubmitting]) => (
											<Button
												key="create-person-submit-button"
												type="submit"
												variant="bordered"
												isDisabled={!canSubmit}
											>
												{!isSubmitting ? "Submit" : "Submitting..."}
											</Button>
										)}
									</form.Subscribe>
								</Form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
