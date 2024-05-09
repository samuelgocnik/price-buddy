'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { users, type User } from '@/db/schema/users';
import { type EditProfileFormSchema } from '@/schema/user';

export const updateUserNameAction = async (
	user: EditProfileFormSchema & Pick<User, 'id'>
) => {
	const result = await db.update(users).set(user).where(eq(users.id, user.id));
	if (result.rowsAffected === 0) {
		throw new Error('Failed to update user profile.');
	}
	revalidatePath('/profile');
	return result.rowsAffected;
};

export const getUserById = (userId: User['id']) =>
	db.query.users.findFirst({
		where: eq(users.id, userId)
	});
