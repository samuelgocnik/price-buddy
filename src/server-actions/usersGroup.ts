'use server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { usersGroups } from '@/db/schema/userGroups';

export const addUserToGroupAction = async (
	emails: string[],
	groupId: string,
	authorId: string
): Promise<string[]> => {
	const inserted: string[] = [];
	for (const email of emails) {
		try {
			const user = await findUserByEmail(email);
			if (!user) {
				console.log(`Failed to find user with email: ${email}`);
			} else if (user.id !== authorId) {
				if (!inserted.includes(email)) {
					await db.insert(usersGroups).values({ groupId, userId: user.id });
					inserted.push(email);
				}
			}
		} catch (error) {
			console.error(`Error processing email ${email}:`, error);
		}
	}
	await db.insert(usersGroups).values({ groupId, userId: authorId });
	return inserted;
};

const findUserByEmail = async (email: string) =>
	await db.query.users.findFirst({
		where: eq(users.email, email)
	});
