'use client';

import { Info, X } from 'lucide-react';
import { useState } from 'react';

import GroupsPage from '../page';

import { generateMockExpenses } from './../mocked-data';

const GroupsDetail = ({ params }: { params: { id: string } }) => {
	const [info, setInfo] = useState(false);
	const expenses = generateMockExpenses(5);
	const groupsPage = <GroupsPage activeId={parseInt(params.id)} />;

	return (
		<div className="mt-2 flex flex-row">
			<div>{groupsPage}</div>
			<div className="min-w-96 max-w-2xl bg-almond-200 p-8">
				<div className="mb-8 flex items-center justify-between">
					{info ? <b>Group info</b> : <b>Expenses</b>}
					<button onClick={() => setInfo(!info)}>
						{info ? <X size={20} /> : <Info size={20} />}
					</button>
				</div>
				{info ? (
					<div className="flex flex-col">
						<div className="flex flex-row">
							<p className="w-3/6">Members</p>
							<div className="flex flex-col">
								<p>Total expenses</p>
								<p>Expenses per person</p>
							</div>
						</div>
						<p className="my-2">Add member</p>
						<button className="my-2">Leave group</button>
					</div>
				) : (
					<div>
						{expenses.map(expense => (
							<div
								key={expense.id}
								className="my-2 flex items-center justify-between"
							>
								<p>{expense.title}</p>
								<p className="mx-32">{expense.paidById}</p>
								<p>{expense.amount}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default GroupsDetail;
