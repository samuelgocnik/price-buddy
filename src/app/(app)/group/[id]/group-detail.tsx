'use client';

import { Info, X, ArrowLeft } from 'lucide-react';
import { type ReactNode, useState } from 'react';

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
		<div className="my-2 flex h-full flex-row">
			<div className="hidden md:block">{params.groupsPage}</div>
			<div className="min-w-96 max-w-2xl bg-almond-200 p-8">
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
			</div>
		</div>
	);
};

export default GroupDetail;
