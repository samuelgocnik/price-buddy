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
				email('Email has invalid format.'),
				maxLength(64, 'Your email is too long.')
			])
		})
	)
});

export type AddGroupFormSchema = Input<typeof addGroupFormSchema>;

export const addUserFormSchema = object({
	email: string([
		minLength(1, 'Please enter the email.'),
		email('Email has invalid format.'),
		maxLength(64, 'Your email is too long.')
	])
});

export type AddUserFormSchema = Input<typeof addUserFormSchema>;
