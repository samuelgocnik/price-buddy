import {
	string,
	minLength,
	maxLength,
	object,
	type Input,
	email,
	array
} from 'valibot';

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
