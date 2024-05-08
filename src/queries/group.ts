'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type UsersGroups, usersGroups } from '@/db/schema/userGroups';
import { type Groups } from '@/db/schema/groups';

export const leaveGroupAction = async (userId: string, groupId: string) => {
	console.log('User ', userId, ' leaving group ', groupId);
	await db
		.delete(usersGroups)
		.where(
			and(eq(usersGroups.userId, userId), eq(usersGroups.groupId, groupId))
		);
};

export const getGroups = async () => await db.query.groups.findMany();

export const getUsers = async () => await db.query.users.findMany();

// eq didnt work for some reason
export const getExpenses = async () => await db.query.expenses.findMany();

export const getUserGroups = async () => await db.query.usersGroups.findMany();

type UsersGroupsWithGroup = UsersGroups & {
	group: Groups;
};

export const getUsersGroups = async () =>
	await db.query.usersGroups.findMany({
		where: eq(usersGroups.userId, 'd104b5cf-3957-4718-a88d-8bc1869bd626'),
		with: {
			group: true
		}
	});
