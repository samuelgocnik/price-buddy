import { CreditCard, DollarSign } from 'lucide-react';
import { type PropsWithChildren, type ReactNode, Suspense } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	getUserOwedTotal,
	getUserOweTotal,
	getUserReceivedTotal,
	getUserSendTotal
} from '@/queries/expenses';

import { LoaderCentered } from '../ui/loader';

export type UserSummaryCardsProps = {
	userId: string;
};

export const UserSummaryCards = ({ userId }: UserSummaryCardsProps) => {
	const summaryCardsData = [
		{
			title: 'Total Received',
			icon: debtIcon,
			queryFunction: getUserReceivedTotal
		},
		{ title: 'Total Send', icon: debtIcon, queryFunction: getUserSendTotal },
		{
			title: 'You are Owed',
			icon: expenseIcon,
			queryFunction: getUserOwedTotal
		},
		{ title: 'You Owe', icon: expenseIcon, queryFunction: getUserOweTotal }
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			{summaryCardsData.map(cardData => (
				<SummaryCard
					key={cardData.title}
					title={cardData.title}
					icon={cardData.icon}
				>
					<SummaryCardContent
						userId={userId}
						queryFunction={cardData.queryFunction}
					/>
				</SummaryCard>
			))}
		</div>
	);
};

const expenseIcon = <DollarSign className="h-4 w-4 text-muted-foreground" />;
const debtIcon = <CreditCard className="h-4 w-4 text-muted-foreground" />;

type SummaryCardProps = PropsWithChildren & {
	title: string;
	icon: JSX.Element;
};

const SummaryCard = ({ title, icon, children }: SummaryCardProps) => (
	<Card className="min-h-[125px]">
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
			{icon}
		</CardHeader>
		<Suspense fallback={<LoaderCentered size="md" />}>{children}</Suspense>
	</Card>
);

type SummaryCardContentProps = {
	userId: string;
	queryFunction: (userId: string) => Promise<[number, number]>;
};

const SummaryCardContent = async ({
	userId,
	queryFunction
}: SummaryCardContentProps): Promise<JSX.Element> => {
	const [total, change] = await queryFunction(userId);
	return <>{cardData(total.toString(), getChangeMessage(change))}</>;
};

const cardData = (title: string, subtext: string): ReactNode => (
	<CardContent>
		<div className="text-2xl font-bold">{title}</div>
		<p className="text-xs text-muted-foreground">{subtext}</p>
	</CardContent>
);

const getChangeMessage = (change: number) => {
	// "+20.1% from last month"
	const changeString = change > 0 ? `+${change}` : change.toString();
	return `${changeString}+% from last month`;
};
