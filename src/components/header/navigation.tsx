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
								'rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-smoke-100 max-md:flex max-md:items-center max-md:space-x-2 md:hover:bg-secondary/50',
								pathname === link.href &&
									'bg-blue-smoke-200 hover:bg-blue-smoke-200 md:bg-secondary md:text-secondary-foreground md:hover:bg-secondary/60'
							)}
						>
							<link.Icon className="md:hidden" />
							<span>{link.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
