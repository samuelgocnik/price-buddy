import { z } from 'zod';

export const addExpenseformSchema = z.object({
	title: z.string().min(3).max(30),
	amount: z.number().min(0.01),
	group: z.string(),
	category: z.string()
});
