'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';
import { groups } from '@/db/schema/groups';

export const leaveGroupAction = async (userId: string, groupId: string) => {
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

export const getUsersGroups = async (id: string) => {
	const ug = await db.query.usersGroups.findMany({
		where: eq(usersGroups.userId, id),
		with: {
			group: true
		}
	});
	return ug.filter(u => !u.deletedAt);
};

export const getUserGroupsRelations = async (groupId: string) =>
	await db.query.usersGroups.findMany({
		where: eq(usersGroups.groupId, groupId),
		with: {
			user: true
		}
	});
