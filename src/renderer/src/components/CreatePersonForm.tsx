import {
	addToast,
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@heroui/react";
import { useApi } from "@renderer/api";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const personSchema = z.object({
	name: z.string().min(1, "Name must not be empty"),
	countryId: z.number().min(1, "Country ID must be valid"),
});

export const CreatePersonFormModal = ({
	countryId,
	isOpen,
	onClose,
}: {
	countryId: number;
	isOpen: boolean;
	onClose: () => void;
}) => {
	const queryClient = useQueryClient();
	const api = useApi();

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
		onSubmit: async ({ value: person, formApi }) => {
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
				onClose();
				formApi.reset();
			}
		},
	});

	return (
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
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
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
	);
};
