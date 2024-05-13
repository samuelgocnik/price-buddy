'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Button } from '@/components/ui/button';
import { useAddUserToGroupMutation } from '@/queries/groupsMutations';
import { addUserFormSchema, type AddUserFormSchema } from '@/schema/schema';
import { FormTextInput } from '@/components/forms/form-input';
import { cn } from '@/lib/cn';

type AddUserProps = {
	groupId: string;
};

export const AddUserToGroup = (props: AddUserProps) => {
	const { mutate } = useAddUserToGroupMutation();
	const form = useForm<AddUserFormSchema>({
		resolver: valibotResolver(addUserFormSchema),
		defaultValues: {
			email: ''
		}
	});

	const onSubmit = (values: AddUserFormSchema) => {
		const updatedValues = {
			email: values.email,
			groupId: props.groupId
		};
		mutate(updatedValues, {
			onSuccess: () => {
				form.reset({
					email: ''
				});
			}
		});
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div
					className={cn(
						'max-md:space-y-2 md:grid md:grid-cols-[3fr_1fr] md:gap-3'
					)}
				>
					<FormTextInput
						formControl={form.control}
						label="Enter e-mail"
						name="email"
						placeholder="email@gmail.com"
					/>
					<Button
						type="submit"
						className="px-4 py-2 max-md:space-y-2 md:grid md:grid-cols-[1fr_4fr] md:gap-3"
					>
						Add User
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
