'use server';

import { revalidatePath } from 'next/cache';
import { and, eq, isNull, desc } from 'drizzle-orm';

import { db } from '@/db';
import { groups } from '@/db/schema/groups';
import { type AddGroupParams } from '@/mutations/groups';
import { users } from '@/db/schema/users';
import { usersGroups } from '@/db/schema/userGroups';
import { expenses } from '@/db/schema/expenses';
import { type Groups, type GroupsWithRelations } from '@/db/schema/groups';

import { addUserToGroupAction } from './usersGroup';

export const addGroupAction = async (data: AddGroupParams) => {
	const result = await db.insert(groups).values(data).returning();
	if (result.length === 0) {
		throw new Error('Failed to create group!');
	}
	const insertedUsers = await addUserToGroupAction(
		data.emails,
		result[0].id,
		data.authorId
	);
	revalidatePath('/dashboard');
	return insertedUsers;
};

export type AddUserToGroupParams = {
	email: string;
	groupId: string;
};

export const addSingleUserToGroupAction = async (
	data: AddUserToGroupParams
) => {
	const foundUser = await db.query.users.findFirst({
		where: and(eq(users.email, data.email), isNull(users.deletedAt))
	});

	if (foundUser === undefined) {
		throw new Error('User not registered in our application');
	}

	const usersAlreadyInGroup = await db.query.groups.findFirst({
		where: and(eq(groups.id, data.groupId), isNull(groups.deletedAt)),
		with: {
			users: true
		}
	});

	if (usersAlreadyInGroup?.users.map(x => x.userId).includes(foundUser.id)) {
		throw new Error('User is already in the group!');
	}

	const userGroupsResult = await db
		.insert(usersGroups)
		.values({ groupId: data.groupId, userId: foundUser.id })
		.returning();
	if (userGroupsResult.length === 0) {
		throw new Error('Failed to add the user to the group!');
	}
	revalidatePath('/group/id');
	return userGroupsResult;
};

// TODO fix after DB reset
export const getGroupsPreview = async (
	userId: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	limit?: number
): Promise<Groups[]> => {
	// We want to show in the dashboard groups that are relevant (user is member of) groups and recent activities
	/* Steps:
		- Find all groups, and include users and expenses
		- from users table we want to find if the user is a member of the group
		- from expenses table we want to find the most recent expense (based on createdAt) for each group
		- now the prepared groups, are sorted based on their most recent includedexpense
		- return number of groups based on the limit
		- join expenses and users tables
		- from users table we want to find if the user is a member of the group
		- from expenses table we want to find the most recent expense (based on createdAt) for each group
		
		- now the prepared groups, are sorted based on their most recent includedexpense
		- return number of groups based on the limit
	*/

	console.log('User id:', userId);

	const groupsWithRelations: GroupsWithRelations[] =
		await db.query.groups.findMany({
			with: {
				users: {
					// Array will include only user with the provided userId
					where: eq(usersGroups.userId, userId),
					with: {
						user: true
					}
				},
				expenses: {
					// get the most recent expense for each group
					orderBy: desc(expenses.createdAt),
					limit: 1
				}
			}
		});

	const groupsForUser = groupsWithRelations.filter(g => g.users.length === 1);

	// sort based on the most recent expense
	groupsForUser.sort((a, b) => {
		const aDate = new Date(a.expenses[0]?.createdAt).getTime();
		const bDate = new Date(b.expenses[0]?.createdAt).getTime();
		return aDate - bDate;
	});

	// limit the number of groups based on the limit

	console.log(
		'Groups that should included users and one expense:',
		groupsForUser
	);

	await sleep(2000);
	return groupsForUser;
};

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));

export const leaveGroupAction = async ({
	userId,
	groupId
}: {
	userId: string;
	groupId: string;
}) => {
	await db
		.update(usersGroups)
		.set({ deletedAt: new Date().toString() })
		.where(
			and(eq(usersGroups.userId, userId), eq(usersGroups.groupId, groupId))
		);
};

export const getGroupName = async (id: string) => {
	const group = await db.query.groups.findFirst({
		where: eq(groups.id, id)
	});
	return group ? group.name : '';
};

export const getUsersGroups = async (id: string) =>
	await db.query.usersGroups.findMany({
		where: and(eq(usersGroups.userId, id), isNull(usersGroups.deletedAt)),
		with: {
			group: true
		}
	});

export const getUserGroupsRelations = async (groupId: string) =>
	await db.query.usersGroups.findMany({
		where: eq(usersGroups.groupId, groupId),
		with: {
			user: true
		}
	});
