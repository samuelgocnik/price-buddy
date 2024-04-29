import { CoinsIcon } from 'lucide-react';

import { auth } from '@/auth';

import { SignOutButton } from './auth/signout-button';
import Loader from './ui/loader';

// TODO: @samuelgocnik
const Header = async () => {
	const session = await auth();

	const isLoggedIn = !!session?.user;

	if (session === null) {
		return null;
	}

	return (
		<header className="flex items-center justify-center gap-6 bg-primary p-4 text-xl font-medium text-primary-foreground">
			<CoinsIcon size={30} />
			<Loader size="xs" className="text-red-500" />
			<Loader size="sm" className="text-orange-500" />
			<Loader size="md" className="text-yellow-500" />
			<Loader size="lg" className="text-green-500" />
			<Loader size="xl" className="text-blue-500" />
			<Loader size="2xl" className="text-purple-500" />
			<h1>PriceBuddy</h1>

			{isLoggedIn && (
				<>
					loggedin <SignOutButton variant="secondary" />
				</>
			)}
		</header>
	);
};

export default Header;
