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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SelectExpense } from './selectExpense';

export const AddExpense = () => (
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
					<Input id="title" type="text" className="col-span-3" />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="amount" className="text-right">
						Amount €
					</Label>
					<Input
						id="amount"
						type="number"
						defaultValue="0"
						className="col-span-3"
						step="0.01"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="group" className="text-right">
						Group
					</Label>
					<SelectExpense isCategory={false} />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="category" className="text-right">
						Category
					</Label>
					<SelectExpense isCategory />
				</div>
			</div>
			<DialogFooter>
				<Button type="submit">Save changes</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);
