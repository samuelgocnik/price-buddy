'use server';

import { and, eq, isNull } from 'drizzle-orm';

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
