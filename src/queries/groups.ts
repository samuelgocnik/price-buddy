'use server';

import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';
import { type Groups, type GroupsWithRelations } from '@/db/schema/groups';

export const getGroupsPreview = async (
	userId: string,
	limit?: number
): Promise<Groups[]> => {
	// TODO We want to show in the dashboard groups that are relevant (user is member of) groups and recent activities
	/* Steps:
		- Find all groups that the user is a member of
		- join expenses and users tables
		- from users table we want to find if the user is a member of the group
		- from expenses table we want to find the most recent expense (based on createdAt) for each group
		
		- now the prepared groups, are sorted based on their most recent includedexpense
		- return number of groups based on the limit
	*/

	// TODO the query does not include any records from the relations "users"
	const tmp: GroupsWithRelations[] = await db.query.groups.findMany({
		with: {
			users: {
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
	console.log('Groups that should included users and one expense:', tmp);

	const groups: Groups[] = await db.query.groups.findMany({
		limit
	});

	await sleep(2000);
	return groups;
};

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));
