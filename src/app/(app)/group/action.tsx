'use server';
import { redirect } from 'next/navigation';

import { db } from '@/db';

export const redirectToGroup = ({ id }: { id: string }) => {
	redirect(`/group/${id}`);
};

export const leaveGroupAction = () => {
	console.log('Leaving group');
};
export const getGroups = async () => await db.query.groups.findMany();
