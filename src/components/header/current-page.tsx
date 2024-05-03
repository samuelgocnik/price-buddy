'use client';

import { usePathname } from 'next/navigation';

import { NAVIGATION_LINKS_WITH_PROFILE } from '@/lib/navigationConstants';

const CurrentPage = () => {
	const pathname = usePathname();

	const curr = NAVIGATION_LINKS_WITH_PROFILE.find(link =>
		pathname.startsWith(link.href)
	);

	// Basically this case should never happen
	if (!curr) {
		return null;
	}

	return (
		<div className="flex items-center gap-2 text-lg font-medium">
			<curr.Icon />
			<h1>{curr.title}</h1>
		</div>
	);
};

export default CurrentPage;
