'use client';

import { Info, X, ArrowLeft, TicketPlus } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';

import { redirectToGroups } from '../action';

type GroupDetailProps = {
	id: string;
	groupsPage: ReactNode;
	expenseList: ReactNode;
	groupInfo: ReactNode;
};

const GroupDetail = (params: GroupDetailProps) => {
	const [info, setInfo] = useState(false);
	const handleClick = () => {
		redirectToGroups();
	};

	return (
		<div className="flex h-[calc(100vh-5rem)] w-full flex-row md:h-[calc(100vh-6rem)]">
			<div className="hidden md:block">{params.groupsPage}</div>
			<div className="w-[40rem] bg-almond-200 p-8">
				<div className="mb-8 flex items-center justify-between">
					<button className="block md:hidden" onClick={handleClick}>
						<ArrowLeft size={20} />
					</button>
					{info ? <b>Group info</b> : <b>Expenses</b>}
					<button onClick={() => setInfo(!info)}>
						{info ? <X size={20} /> : <Info size={20} />}
					</button>
				</div>
				{info ? <div>{params.groupInfo}</div> : <div>{params.expenseList}</div>}
				{!info && (
					<div className="fixed bottom-8">
						<div className="flex flex-row-reverse">
							<Button LeadingIcon={TicketPlus} className="ml-auto w-24">
								Add
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GroupDetail;
