'use server';

import { redirect } from 'next/navigation';

export const redirectToGroup = ({ id }: { id: number }) => {
	redirect(`/group/${id}`);
};
