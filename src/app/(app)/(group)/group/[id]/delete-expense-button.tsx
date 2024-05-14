'use client';

import { Trash2, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { deleteExpense } from '../../../../../queries/expenses';

// TODO: move to queries folder after everything is done
const useDeleteExpenseMutation = () => {
	const r = useRouter();
	const { toast } = useToast();

	return useMutation({
		mutationFn: deleteExpense,
		onSuccess: () => {
			toast({ title: 'Expense deleted!' });
			r.refresh();
		},
		onError: error => {
			toast({
				title: 'Failed to delete expense',
				description: error.message,
				variant: 'destructive'
			});
		}
	});
};

export const DeleteExpenseButton = ({ expenseId }: { expenseId: string }) => {
	const { mutate, isPending } = useDeleteExpenseMutation();
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
