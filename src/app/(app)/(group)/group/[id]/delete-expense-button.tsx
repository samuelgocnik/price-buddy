'use client';

import { Trash2, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeleteExpense } from '@/mutations/expenses';

export const DeleteExpenseButton = ({ expenseId }: { expenseId: string }) => {
	const { mutate, isPending } = useDeleteExpense();
	return (
		<Button
			variant="destructive"
			className="my-auto ml-auto h-8 w-16"
			onClick={() => {
				mutate(expenseId);
			}}
			disabled={isPending}
		>
			{isPending ? <Loader size={15} /> : <Trash2 size={15} />}
		</Button>
	);
};
