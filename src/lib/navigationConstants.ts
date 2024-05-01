import {
	HandCoinsIcon,
	LayoutDashboardIcon,
	UserIcon,
	UsersIcon
} from 'lucide-react';

export const NAVIGATION_LINKS = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		Icon: LayoutDashboardIcon
	},
	{
		title: 'Groups',
		href: '/group',
		Icon: UsersIcon
	},
	{
		title: 'Expenses',
		href: '/expenses',
		Icon: HandCoinsIcon
	}
];

export const NAVIGATION_LINKS_WITH_PROFILE = [
	...NAVIGATION_LINKS,
	{
		title: 'Profile',
		href: '/profile',
		Icon: UserIcon
	}
];
