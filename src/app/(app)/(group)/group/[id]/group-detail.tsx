'use client';

import { Info, X, ArrowLeft } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import Link from 'next/link';

type GroupDetailProps = {
	id: string;
	name: ReactNode;
	expenseList: ReactNode;
	groupInfo: ReactNode;
	addExpense: ReactNode;
};

const GroupDetail = (props: GroupDetailProps) => {
	const [info, setInfo] = useState(false);

	return (
		<div className="flex min-h-full flex-1 flex-col p-8 md:rounded-l-lg md:bg-almond-100">
			{!info && (
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-2xl">{props.name}</h1>
					{props.addExpense}
				</div>
			)}
			<div className="mb-8 flex items-center justify-between">
				<Link className="block md:hidden" href="/group">
					<ArrowLeft size={24} />
				</Link>
				{info ? <b>Group info</b> : <b>Expenses</b>}
				<button onClick={() => setInfo(prev => !prev)}>
					{info ? <X size={24} /> : <Info size={24} />}
				</button>
			</div>
			{info ? (
				<div>{props.groupInfo}</div>
			) : (
				<div className="overflow-y-auto">{props.expenseList}</div>
			)}
		</div>
	);
};

export default GroupDetail;
