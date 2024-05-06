'use client';

import { Info, X, ArrowLeft, TicketPlus } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type GroupDetailProps = {
	id: string;
	groupsPage: ReactNode;
	expenseList: ReactNode;
	groupInfo: ReactNode;
};

const GroupDetail = (props: GroupDetailProps) => {
	const [info, setInfo] = useState(false);

	return (
		<div className="flex min-h-[calc(100vh-5rem)] w-full flex-row md:min-h-[calc(100vh-6rem)]">
			<div className="hidden md:block">{props.groupsPage}</div>
			<div className="w-[40rem] bg-almond-200 p-8">
				{!info && (
					<div className="flex flex-row-reverse">
						<Button LeadingIcon={TicketPlus} className="mb-12 ml-auto w-24">
							Add
						</Button>
					</div>
				)}
				<div className="mb-8 flex items-center justify-between">
					<Link className="block md:hidden" href="/group">
						<ArrowLeft size={20} />
					</Link>
					{info ? <b>Group info</b> : <b>Expenses</b>}
					<button onClick={() => setInfo(!info)}>
						{info ? <X size={20} /> : <Info size={20} />}
					</button>
				</div>
				{info ? <div>{props.groupInfo}</div> : <div>{props.expenseList}</div>}
			</div>
		</div>
	);
};

export default GroupDetail;
