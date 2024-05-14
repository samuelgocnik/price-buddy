import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/lib/hooks/use-toast';
import { addExpenseAction } from '@/server-actions/expenses';

import { deleteExpense } from './expenses';

export const useAddExpense = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: addExpenseAction,
		onSuccess: () => {
			toast({
				title: 'Expense successfully created!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to create expense',
				variant: 'destructive'
			});
		}
	});
};

export const useDeleteExpense = () => {
	const r = useRouter();
	const { toast } = useToast();

	return useMutation({
		mutationFn: deleteExpense,
		onSuccess: () => {
			toast({ title: 'Expense deleted!' });
			r.refresh();
		},
		onError: () => {
			toast({
				title: 'Failed to delete expense',
				variant: 'destructive'
			});
		}
	});
};
