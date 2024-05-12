'use server';

import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';
import { type Groups, type GroupsWithRelations } from '@/db/schema/groups';
import { usersGroups } from '@/db/schema/userGroups';

// TODO fix after DB reset
export const getGroupsPreview = async (
	userId: string,
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

	// groupsForUser.forEach(group => {
	// 	console.log("Group:", group.name, "\nExpenses:");
	// 	console.log(group.expenses)
	// });

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
