'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { FormProvider, useForm } from 'react-hook-form';
import { type PropsWithChildren } from 'react';

import {
	type EditProfileFormSchema,
	editProfileFormSchema
} from '@/schema/user';
import { type User } from '@/db/schema/users';
import { useUpdateUserProfile } from '@/mutations/profile';

import { FormInput } from '../forms/form-input';
import { Button } from '../ui/button';

type EditProfileFormBaseProps = PropsWithChildren<{
	user: User;
}>;

export const EditProfileFormBase = ({
	user,
	children
}: EditProfileFormBaseProps) => {
	const form = useForm<EditProfileFormSchema>({
		resolver: valibotResolver(editProfileFormSchema),
		mode: 'onBlur',
		defaultValues: {
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? ''
		}
	});

	const { mutate, isPending } = useUpdateUserProfile();

	const onSubmit = (data: EditProfileFormSchema) => {
		mutate(
			{
				id: user.id,
				...data
			},
			{
				onSuccess: () => {
					// Not the cleanest and best way to close the modal, but its the easiest way to do it
					// Workarounding nesting of client and server components as the whole form depends on the
					// users data from database and it would be too complex nesting
					document.getElementById('closeEditProfileModal')?.click();
				}
			}
		);
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				{children}
				<FormInput
					formControl={form.control}
					name="firstName"
					label="Firstname"
					placeholder="Jozef"
				/>
				<FormInput
					formControl={form.control}
					name="lastName"
					label="Lastname"
					placeholder="Kubani"
				/>
				<Button type="submit" disabled={isPending}>
					{isPending ? 'Saving changes...' : 'Save changes'}
				</Button>
			</form>
		</FormProvider>
	);
};
