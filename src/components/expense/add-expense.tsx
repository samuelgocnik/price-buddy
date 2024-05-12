'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	type AddExpenseFormSchema,
	addExpenseFormSchema
} from '@/schema/schema';
import { useAddExpense } from '@/queries/expensesMutations';

import { FormTextInput } from '../forms/form-input';

type AddExpenseProps = {
	selectGroup: React.ReactNode;
	selectCategory: React.ReactNode;
	userId: string;
	selectedGroup?: string;
};

export const AddExpense = (props: AddExpenseProps) => {
	const [open, setOpen] = useState(false);
	const { mutate } = useAddExpense();
	const form = useForm<AddExpenseFormSchema>({
		resolver: valibotResolver(addExpenseFormSchema),
		defaultValues: {
			title: '',
			amount: 0.01
		}
	});

	const onSubmit = (values: AddExpenseFormSchema) => {
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
				<Button TrailingIcon={Plus} variant="outline">
					Add Expense
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full md:w-[600px]">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<DialogHeader>
							<DialogTitle>New Expense</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormTextInput
								formControl={form.control}
								label="Title"
								name="title"
								placeholder="title"
							/>
							<FormTextInput
								formControl={form.control}
								label="Amount €"
								name="amount"
								type="number"
								step={0.01}
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
