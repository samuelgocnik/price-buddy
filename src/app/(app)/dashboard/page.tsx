import { Suspense } from 'react';
import { type Session } from 'next-auth';

import { AddExpense } from '@/components/expense/add-expense';
import { SelectField } from '@/components/expense/select-field';
import { auth } from '@/auth';

const DashboardPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}
	return (
		<div>
			<AddExpense
				selectGroup={
					<Suspense fallback={<div>Loading...</div>}>
						<SelectField isCategory={false} selectedGroup="id1dds" />
					</Suspense>
				}
				selectCategory={
					<Suspense fallback={<div>Loading...</div>}>
						<SelectField isCategory />
					</Suspense>
				}
				userId={userId}
				selectedGroup="id1"
			/>
		</div>
	);
};

export default DashboardPage;
