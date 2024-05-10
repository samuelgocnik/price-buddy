import { Suspense } from 'react';
import { type Session } from 'next-auth';

import { AddExpense } from '@/components/expense/add-expense';
import { SelectField } from '@/components/expense/select-field';
import { auth } from '@/auth';
import { AddGroup } from '@/components/newGroup/add-group';

const DashboardPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}
	const selectedGroup = undefined;
	return (
		<div>
			<AddExpense
				selectGroup={
					<Suspense fallback={<div>Loading...</div>}>
						<SelectField
							isCategory={false}
							selectedGroup={selectedGroup}
							userId={userId}
						/>
					</Suspense>
				}
				selectCategory={
					<Suspense fallback={<div>Loading...</div>}>
						<SelectField isCategory userId={userId} />
					</Suspense>
				}
				userId={userId}
				selectedGroup={selectedGroup}
			/>

			<AddGroup userId={userId} />
		</div>
	);
};

export default DashboardPage;
