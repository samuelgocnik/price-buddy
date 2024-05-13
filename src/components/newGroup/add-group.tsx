'use client';
import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { valibotResolver } from '@hookform/resolvers/valibot';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogHeader
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAddGroup } from '@/queries/groupsMutations';
import { type AddGroupFormSchema, addGroupFormSchema } from '@/schema/group';

import { FormInput } from '../forms/form-input';

type AddGroupProps = {
	userId: string;
};

export const AddGroup = (props: AddGroupProps) => {
	const [open, setOpen] = useState(false);
	const { mutate } = useAddGroup();
	const form = useForm<AddGroupFormSchema>({
		resolver: valibotResolver(addGroupFormSchema),
		defaultValues: {
			name: '',
			emails: []
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'emails'
	});

	const handleDialogChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			form.reset({ name: '', emails: [] });
		}
	};

	const onSubmit = (values: AddGroupFormSchema) => {
		const updatedValues = {
			name: values.name,
			emails: values.emails.map(x => x.email),
			authorId: props.userId
		};
		mutate(updatedValues, {
			onSuccess: () => {
				setOpen(false);
				form.reset({
					name: '',
					emails: []
				});
			}
		});
	};

	return (
		<Dialog open={open} onOpenChange={handleDialogChange}>
			<DialogTrigger asChild>
				<Button TrailingIcon={Users} className="m-8 w-32">
					Add Group
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-screen w-full overflow-y-scroll md:w-[600px]">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<DialogHeader>
							<DialogTitle>New Group</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormInput
								formControl={form.control}
								label="Name"
								name="name"
								placeholder="group name"
							/>
							{fields.map((field, index) => (
								<div key={field.id} className="grid gap-4 py-2">
									<FormInput
										formControl={form.control}
										label={`Email ${index + 1}`}
										name={`emails.${index}.email`}
										placeholder="yourEmail@gmail.com"
									/>
									<Button
										TrailingIcon={Trash2}
										type="button"
										onClick={() => remove(index)}
										className="grid-cols-4 bg-red-700 hover:bg-red-500"
									>
										Remove
									</Button>
								</div>
							))}
							<Button
								TrailingIcon={UserPlus}
								type="button"
								onClick={() => append({ email: '' })}
							>
								Add Member
							</Button>
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};
