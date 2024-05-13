'use client';

import { Info, X, ArrowLeft, TicketPlus } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type GroupDetailProps = {
	id: string;
	name: ReactNode;
	expenseList: ReactNode;
	groupInfo: ReactNode;
};

const GroupDetail = (props: GroupDetailProps) => {
	const [info, setInfo] = useState(false);

	return (
		<div className="flex h-full flex-1 flex-col p-8 md:rounded-l-lg md:bg-almond-200">
			{!info && (
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-2xl">{props.name}</h1>
					<Button LeadingIcon={TicketPlus} className="ml-auto w-24">
						Add
					</Button>
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
