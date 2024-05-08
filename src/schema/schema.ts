import { z } from 'zod';

export const addExpenseFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long.' })
		.max(30, { message: 'Title must be no more than 30 characters long.' }),
	amount: z.number().positive({ message: 'Amount must be greater than 0.' }),
	groupId: z.string().optional(),
	categoryId: z.string()
});

export const addGroupFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters long.' })
		.max(30, { message: 'Name must be no more than 30 characters long.' }),
	emails: z.array(
		z.object({
			email: z.string().email({ message: 'Email must be valid.' })
		})
	)
});
