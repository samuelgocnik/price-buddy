import { CoinsIcon } from 'lucide-react';

import { auth } from '@/auth';

const Header = async () => {
	const session = await auth();

	const isLoggedIn = !!session?.user;

	if (session === null) {
		return null;
	}

	return (
		<header className="flex items-center justify-center gap-6 bg-primary p-4 text-xl font-medium text-primary-foreground">
			<CoinsIcon size={30} />
			<h1>PriceBuddy</h1>
			{isLoggedIn && <>loggedin</>}
		</header>
	);
};

export default Header;
