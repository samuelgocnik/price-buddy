'use server';

import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { type Groups } from '@/db/schema/groups';

export const getGroupsPreview = async (limit?: number): Promise<Groups[]> => {
	/* TODO We want to show in the dashboard groups that are
		- relevant (user is member of) groups
		- recent transactions, or "most used groups" by the user
		- most active (number of members)

		- Add a filter to only show groups that the user is a member of
	*/
	const groups: Groups[] = await db.query.groups.findMany({
		limit
	});

	await sleep(2000);
	return groups;
};

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));
