import {
	string,
	minLength,
	maxLength,
	object,
	type Input,
	number,
	email,
	optional,
	minValue,
	array
} from 'valibot';

export const addExpenseFormSchema = object({
	title: string([
		minLength(3, 'Title must be at least 3 characters long.'),
		maxLength(30, 'Title must be no more than 30 characters long.')
	]),
	amount: number('Amount must be greater than 0.', [minValue(0.01)]),
	groupId: optional(string(), ''),
	categoryId: string([])
});

export type AddExpenseFormSchema = Input<typeof addExpenseFormSchema>;

export const addGroupFormSchema = object({
	name: string([
		minLength(3, 'Name must be at least 3 characters long.'),
		maxLength(30, 'Name must be no more than 30 characters long.')
	]),
	emails: array(
		object({
			email: string([
				minLength(1, 'Please enter your email.'),
				email('The email is badly formatted.'),
				maxLength(30, 'Your email is too long.')
				/* 	customAsync(
					async email =>
						(await db.query.users.findFirst({
							where: eq(users.email, email)
						})) !== undefined
				) */
			])
		})
	)
});

export type AddGroupFormSchema = Input<typeof addGroupFormSchema>;

export const addUserFormSchema = object({
	email: string([
		minLength(1, 'Please enter the email.'),
		email('The email is badly formatted.'),
		maxLength(30, 'Your email is too long.')
	])
});

export type AddUserFormSchema = Input<typeof addUserFormSchema>;
