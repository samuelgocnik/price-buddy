'use server';

import { type Groups } from '@/db/schema/groups';

export const getGroupsPreview = async (limit?: number): Promise<Groups[]> => {
	const groups: Groups[] = [
		{
			id: '1',
			name: 'Group 1',
			photoUrl: 'https://avatars.githubusercontent.com/u/45912417?v=4',
			// photoUrl: null,
			createdAt: new Date().toString(),
			deletedAt: null
		},
		{
			id: '2',
			name: 'Group 2',
			photoUrl:
				'https://imgs.search.brave.com/QxK22s5KjClNbFeX8bZtugqeKqxiQfoBimuB6d9ncw4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzI1Lzk3LzUy/LzM2MF9GXzMyNTk3/NTI1MF90SDJMTW1y/WnVNSEVmMFh6YnVw/cmVOblRjR1lyNG5r/bi5qcGc',
			// photoUrl: null,
			createdAt: new Date().toString(),
			deletedAt: null
		},
		{
			id: '3',
			name: 'Group 3',
			// photoUrl: 'https://via.placeholder.com/150',
			photoUrl: null,
			createdAt: new Date().toString(),
			deletedAt: null
		}
	];

	await sleep(2000);
	return groups;
};

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));
