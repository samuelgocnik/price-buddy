import { Suspense } from 'react';

import { AddExpense } from '@/components/ui/expense/addExpense';
import { SelectField } from '@/components/ui/expense/select-field';

const DashboardPage = () => (
	<div>
		<AddExpense
			selectGroup={
				<Suspense fallback={<div>Loading...</div>}>
					<SelectField isCategory={false} />
				</Suspense>
			}
			selectCategory={
				<Suspense fallback={<div>Loading...</div>}>
					<SelectField isCategory />
				</Suspense>
			}
		/>
	</div>
);

export default DashboardPage;
