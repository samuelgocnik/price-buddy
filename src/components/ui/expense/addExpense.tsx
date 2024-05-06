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
import { Label } from '@/components/ui/label';
import { addExpenseformSchema } from '@/schema/schema';

import { FormTextField } from './form-text-field';
import { FormNumberField } from './form-number-field';

type AddExpenseProps = {
	selectGroup: React.ReactNode;
	selectCategory: React.ReactNode;
};

export const AddExpense = (props: AddExpenseProps) => {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof addExpenseformSchema>>({
		resolver: zodResolver(addExpenseformSchema),
		defaultValues: {
			title: '',
			amount: '',
			group: '',
			category: ''
		}
	});

	const onSubmit = (values: z.infer<typeof addExpenseformSchema>) => {
		console.log(values);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Add Expense</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<FormProvider {...form}>
					<form
						onSubmit={e => {
							e.preventDefault(); // Prevent default form submission behavior
							form.handleSubmit(onSubmit)(e);
						}}
						className="space-y-8"
					>
						<DialogHeader>
							<DialogTitle>New Expense</DialogTitle>
							<DialogDescription>Create new Expense</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="title" className="text-right">
									Title
								</Label>
								<FormTextField name="title" label="title" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="amount" className="text-right">
									Amount €
								</Label>
								<FormNumberField name="amount" label="amount" />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="group" className="text-right">
									Group
								</Label>
								{props.selectGroup}
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="category" className="text-right">
									Category
								</Label>
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
