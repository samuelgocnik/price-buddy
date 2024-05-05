'use server';

import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';

export const redirectToGroup = ({ id }: { id: string }) => {
	redirect(`/group/${id}`);
};

export const redirectToGroups = () => {
	redirect('/group');
};

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
