'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useIsBreakpoint } from '@/lib/hooks/useIsBreakpoint';

// On desktop we need to redirect to the group detail to show the group by default
// Tbh I think it's not a good idea to do it this way, but it's a quick fix for now
export const RedirectToGroupDetail = ({ groupId }: { groupId: string }) => {
	const isMobile = useIsBreakpoint('md');

	useEffect(() => {
		if (!isMobile) {
			redirect(`/group/${groupId}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};
