'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NAVIGATION_LINKS } from '@/lib/navigationConstants';
import { cn } from '@/lib/cn';

const Navigation = () => {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex flex-col max-md:space-y-3 md:flex-row md:items-center md:space-x-3">
				{NAVIGATION_LINKS.map(link => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={cn(
								'block rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-smoke-100 md:hover:bg-blue-smoke-600',
								pathname === link.href &&
									'bg-blue-smoke-200 hover:bg-blue-smoke-200 md:bg-blue-smoke-500 md:hover:bg-blue-smoke-500'
							)}
						>
							{link.title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
