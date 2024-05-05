'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { leaveGroupAction } from '../action';

export const LeaveGroupButton = ({
	userId,
	groupId
}: {
	userId: string;
	groupId: string;
}) => {
	const router = useRouter();
	return (
		<Button
			TrailingIcon={LogOut}
			className="fixed bottom-8 mx-32 border-none text-red-800 hover:text-red-600"
			variant="ghost"
			onClick={() => {
				leaveGroupAction(userId, groupId);
				router.push('/group');
			}}
		>
			Leave group
		</Button>
	);
};
