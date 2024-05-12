import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { addExpenseAction } from '@/server-actions/expenses';
import { type ExpensesCreate } from '@/db/schema/expenses';

export const useAddExpense = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (data: ExpensesCreate) => {
			await addExpenseAction(data);
		},
		onSuccess: () => {
			toast({
				title: 'Expense successfully created!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to create the expense',
				variant: 'destructive'
			});
		}
	});
};
