'use server';

import { redirect } from 'next/navigation';

import { db } from '@/db';

export const redirectToGroup = ({ id }: { id: string }) => {
	redirect(`/group/${id}`);
};

export const redirectToGroups = () => {
	redirect('/group');
};

export const leaveGroupAction = () => {
	console.log('Leaving group');
};
export const getGroups = async () => await db.query.groups.findMany();

export const getUsers = async () => await db.query.users.findMany();

// eq didnt work for some reason
export const getExpenses = async () => await db.query.expenses.findMany();

export const getUserGroups = async () => await db.query.usersGroups.findMany();
