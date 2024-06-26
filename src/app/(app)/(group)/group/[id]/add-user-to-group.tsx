'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Button } from '@/components/ui/button';
import { useAddUserToGroup } from '@/mutations/groups';
import { addUserFormSchema, type AddUserFormSchema } from '@/schema/group';
import { FormInput } from '@/components/forms/form-input';

type AddUserProps = {
	groupId: string;
};

export const AddUserToGroup = (props: AddUserProps) => {
	const { mutate, isPending } = useAddUserToGroup();
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
				<div className="max-md:space-y-2 md:grid md:grid-cols-[3fr_1fr] md:gap-3">
					<FormInput
						formControl={form.control}
						label="E-mail"
						name="email"
						placeholder="email@gmail.com"
					/>
					<Button
						disabled={isPending}
						type="submit"
						className="px-4 py-2 max-md:space-y-2 md:gap-3"
					>
						Add User
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
