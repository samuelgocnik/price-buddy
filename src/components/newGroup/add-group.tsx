'use client';
import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { Users, UserPlus, Trash2 } from 'lucide-react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogHeader
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { addGroupFormSchema } from '@/schema/schema';
import { useAddGroup } from '@/queries/groups';

import { FormInput } from '../ui/form-input';

type AddGroupProps = {
	userId: string;
};

type FormSchema = z.infer<typeof addGroupFormSchema>;

export const AddGroup = (props: AddGroupProps) => {
	const [open, setOpen] = useState(false);
	const { mutate } = useAddGroup();
	const form = useForm<FormSchema>({
		resolver: zodResolver(addGroupFormSchema),
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
			form.reset({ name: '', emails: [{ email: '' }] });
		}
	};

	const onSubmit = (values: FormSchema) => {
		setOpen(false);
		form.reset({
			name: '',
			emails: [{ email: '' }]
		});
		const updatedValues = {
			name: values.name,
			emails: values.emails.map(x => x.email),
			authorId: props.userId
		};
		console.log(updatedValues);
		mutate(updatedValues);
	};

	return (
		<Dialog open={open} onOpenChange={handleDialogChange}>
			<DialogTrigger asChild>
				<Button TrailingIcon={Users} variant="outline">
					Add Group
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full md:w-[600px]">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<DialogHeader>
							<DialogTitle>New Group</DialogTitle>
							<DialogDescription>Create new Group</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormInput
								label="Name"
								name="name"
								formControl={form.control}
								placeholder=""
								autoComplete="off"
								className="md:grid md:grid-cols-[1fr_3fr] md:items-center md:gap-4 md:text-left"
							/>
							{fields.map((field, index) => (
								<div
									key={field.id}
									className="md:grid md:grid-cols-[4fr_1fr] md:items-center md:gap-4"
								>
									<FormInput
										label={`Email ${index + 1}`}
										name={`emails.${index}.email`}
										formControl={form.control}
										placeholder="Email"
										autoComplete="off"
										className="md:grid md:grid-cols-[1fr_2fr] md:items-center md:gap-4 md:text-left"
									/>
									<Button
										TrailingIcon={Trash2}
										type="button"
										onClick={() => remove(index)}
										className="bg-red-700 hover:bg-red-500"
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
