'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useIsBreakpoint } from '@/lib/hooks/use-is-breakpoint';
import { usePrevious } from '@/lib/hooks/use-previous';

// On desktop we need to redirect to the group detail to show the group by default
// Tbh I think it's not a good idea to do it this way, but it's a quick fix for now
export const RedirectToGroupDetail = ({ groupId }: { groupId: string }) => {
	const isMobile = useIsBreakpoint('md');

	const previousIsMobile = usePrevious(isMobile);

	useEffect(() => {
		if (!isMobile) {
			redirect(`/group/${groupId}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Redirect back to the group detail if the user switches to desktop view
	useEffect(() => {
		if (!isMobile && previousIsMobile === true) {
			redirect(`/group/${groupId}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile]);

	return null;
};
