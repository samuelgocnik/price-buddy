'use client';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addExpenseformSchema } from '@/schema/schema';

import { DialogFormField } from './formField';

type AddExpenseProps = {
	selectGroup: React.ReactNode;
	selectCategory: React.ReactNode;
};

export const AddExpense = (props: AddExpenseProps) => {
	const form = useForm<z.infer<typeof addExpenseformSchema>>({
		resolver: zodResolver(addExpenseformSchema)
	});

	const onSubmit = (values: z.infer<typeof addExpenseformSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Add Expense</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>New Expense</DialogTitle>
						<DialogDescription>Create new Expense</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<DialogFormField form={form} id="title" type="text" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="amount" className="text-right">
								Amount €
							</Label>
							<DialogFormField form={form} id="amount" type="number" />
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
				</DialogContent>
			</Dialog>
		</Form>
	);
};
