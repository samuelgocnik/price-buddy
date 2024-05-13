import {
	string,
	minLength,
	maxLength,
	object,
	type Input,
	number,
	optional,
	minValue
} from 'valibot';

export const addExpenseFormSchema = object({
	title: string([
		minLength(3, 'Title must be at least 3 characters long.'),
		maxLength(30, 'Title must be no more than 30 characters long.')
	]),
	amount: number('Amount must be greater than 0.', [minValue(0.01)]),
	groupId: optional(string(), ''), // optional because of workaround in preselected group
	categoryId: string([])
});

export type AddExpenseFormSchema = Input<typeof addExpenseFormSchema>;
