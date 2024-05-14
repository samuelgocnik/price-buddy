import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { addExpenseAction } from '@/server-actions/expenses';

export const useAddExpense = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: addExpenseAction,
		onSuccess: () => {
			toast({
				title: 'Expense successfully created!'
			});
		},
		onError: e => {
			toast({
				title: e.message,
				variant: 'destructive'
			});
		}
	});
};
