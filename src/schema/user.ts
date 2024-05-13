import { string, minLength, maxLength, object, type Input } from 'valibot';

export const editProfileFormSchema = object({
	firstName: string([
		minLength(2, 'First name should be at least 2 characters long'),
		maxLength(50, 'Your name is too long')
	]),
	lastName: string([
		minLength(2, 'Last name should be at least 2 characters long'),
		maxLength(50, 'Your last name is too long')
	])
});

export type EditProfileFormSchema = Input<typeof editProfileFormSchema>;
