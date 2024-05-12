'use client';

import { Info, X, ArrowLeft, TicketPlus } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type GroupDetailProps = {
	id: string;
	name: string;
	groupsPage: ReactNode;
	expenseList: ReactNode;
	groupInfo: ReactNode;
	addExpense: ReactNode;
};

const GroupDetail = (props: GroupDetailProps) => {
	const [info, setInfo] = useState(false);

	return (
		<div className="grid min-h-[calc(100vh-5rem)] gap-0 md:min-h-[calc(100vh-6rem)] md:grid-cols-3">
			<div className="col-span-1 hidden md:block">{props.groupsPage}</div>
			<div className="col-span-2 rounded-lg bg-almond-200 p-8 shadow md:rounded-none md:rounded-r-lg">
				{!info && (
					<div className="mb-8 flex items-center justify-between">
						<h1 className="text-2xl">{props.name}</h1>
						{props.addExpense}
					</div>
				)}
				<div className="mb-8 flex items-center justify-between">
					<Link className="block md:hidden" href="/group">
						<ArrowLeft size={20} />
					</Link>
					{info ? <b>Group info</b> : <b>Expenses</b>}
					<button
						onClick={() => {
							setInfo(!info);
						}}
					>
						{info ? <X size={20} /> : <Info size={20} />}
					</button>
				</div>
				{info ? <div>{props.groupInfo}</div> : <div>{props.expenseList}</div>}
			</div>
		</div>
	);
};

export default GroupDetail;
