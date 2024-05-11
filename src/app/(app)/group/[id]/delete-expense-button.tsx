'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { deleteExpense } from '../../../../queries/expenses';

export const DeleteExpenseButton = ({ expenseId }: { expenseId: string }) => {
	const router = useRouter();
	return (
		<Button
			variant="destructive"
			className="my-auto ml-auto h-8 w-16"
			onClick={() => {
				deleteExpense(expenseId);
				router.refresh();
			}}
		>
			<Trash2 size={15} />
		</Button>
	);
};
