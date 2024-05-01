import { CoinsIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import ProfileDropdown from './profile-dropdown';
import Navigation from './navigation';
import HamburgerMenu from './hamburger-menu';
import CurrentPage from './current-page';

const Header = () => (
	<header className="bg-primary px-4 py-3 text-primary-foreground md:px-6">
		{/* Desktop version */}
		<div className="container mx-auto flex items-center justify-between max-md:hidden">
			<Link href="/dashboard">
				<div className="flex items-center gap-2 text-lg font-medium">
					<CoinsIcon size={32} />
					<h1>PriceBuddy</h1>
				</div>
			</Link>
			<Navigation />
			<Suspense
				fallback={
					<div className="h-10 w-10 animate-pulse rounded-full bg-almond-100" />
				}
			>
				<ProfileDropdown dropdownAlign="end" />
			</Suspense>
		</div>

		{/* Mobile version */}
		<div className="flex justify-between md:hidden">
			<div />
			<CurrentPage />
			<HamburgerMenu />
		</div>
	</header>
);
export default Header;
