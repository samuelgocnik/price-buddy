'use client';

import { Trash2, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { deleteExpense } from '../../../../../queries/expenses';

type DeleteExpenseMutationParams = {
	expenseId: string;
};

const useLeaveGroupMutation = () => {
	const r = useRouter();
	const { toast } = useToast();

	const mutation = useMutation({
		mutationFn: async (params: DeleteExpenseMutationParams) => {
			await deleteExpense(params.expenseId);
			toast({ title: 'Expense deleted!' });
			r.refresh();
		}
	});

	return {
		mutate: mutation.mutate,
		isPending: mutation.isPending
	};
};

export const DeleteExpenseButton = ({ expenseId }: { expenseId: string }) => {
	const { mutate, isPending } = useLeaveGroupMutation();
	return (
		<Button
			variant="destructive"
			className="my-auto ml-auto h-8 w-16"
			onClick={() => {
				mutate({ expenseId });
			}}
		>
			{isPending ? <Loader size={15} /> : <Trash2 size={15} />}
		</Button>
	);
};
