'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { addExpenseFormSchema } from '@/schema/schema';
import { useAddExpense } from '@/queries/expenses';

import { FormInput } from '../ui/form-input';

type AddExpenseProps = {
	selectGroup: React.ReactNode;
	selectCategory: React.ReactNode;
	userId: string;
	selectedGroup?: string;
};

type FormSchema = z.infer<typeof addExpenseFormSchema>;

export const AddExpense = (props: AddExpenseProps) => {
	const [open, setOpen] = useState(false);
	const { mutate } = useAddExpense();
	const form = useForm<FormSchema>({
		resolver: zodResolver(addExpenseFormSchema),
		defaultValues: {
			title: '',
			amount: 0.01
		}
	});

	const onSubmit = (values: FormSchema) => {
		setOpen(false);
		const selectedGroup = props.selectedGroup ?? values.groupId;

		const updatedValues = {
			...values,
			amount: String(values.amount),
			groupId: selectedGroup ?? '',
			paidById: props.userId
		};
		console.log(updatedValues);
		mutate(updatedValues);
		form.reset({
			title: '',
			amount: 0.01
		});
	};

	const handleDialogChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			form.reset({
				title: '',
				amount: 0.01
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleDialogChange}>
			<DialogTrigger asChild>
				<Button variant="outline">Add Expense</Button>
			</DialogTrigger>
			<DialogContent className="w-full md:w-[600px]">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<DialogHeader>
							<DialogTitle>New Expense</DialogTitle>
							<DialogDescription>Create new Expense</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormInput
								label="Title"
								name="title"
								formControl={form.control}
								placeholder=""
								autoComplete="off"
								className="md:grid md:grid-cols-[1fr_4fr] md:items-center md:gap-4 md:text-right"
							/>
							<FormInput
								label="Amount €"
								name="amount"
								type="number"
								step={0.01}
								formControl={form.control}
								placeholder=""
								autoComplete="off"
								className="md:grid md:grid-cols-[1fr_4fr] md:items-center md:gap-4 md:text-right"
							/>
							<div className="grid items-center gap-4 md:grid md:grid-cols-[1fr_4fr] md:text-right">
								{props.selectGroup}
							</div>
							<div className="grid items-center gap-4 md:grid md:grid-cols-[1fr_4fr] md:text-right">
								{props.selectCategory}
							</div>
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
