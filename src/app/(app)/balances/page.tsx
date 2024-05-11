import { type Session, User } from 'next-auth';

import { auth } from '@/auth';

const BalancesPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}

	// const user: User = session?.user!;

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
			<p>Welcome to your balances page</p>
		</div>
	);
};

export default BalancesPage;
