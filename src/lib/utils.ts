export type AmountAndDate = {
	amount: string;
	date: string;
};

/**
 * Calculate:
 * - total amount
 * - percentage of change in amount for the current month
 */
export const calculateAmountAndMonthChange = (
	amountAndDate: AmountAndDate[]
) => {
	const totalAmount = amountAndDate.reduce(
		(acc, data) => safeAccAdd(acc, data.amount),
		0.0
	);

	// Get all expenses for the current month
	const monthExpenses = amountAndDate.filter(
		expense => new Date(expense.date).getMonth() === new Date().getMonth()
	);
	// Calculate the total amount for the current month
	const monthAmount = monthExpenses.reduce(
		(acc, expense) => safeAccAdd(acc, expense.amount),
		0.0
	);

	let percentage = (monthAmount / totalAmount) * 100;

	// Round to 2 decimal places
	percentage = Number.isNaN(percentage) ? 0.0 : +percentage.toFixed(2);
	const amount: number = +totalAmount.toFixed(2);

	return [amount, percentage];
};

const safeAccAdd = (acc: number, num: string) => {
	const n = Number.parseFloat(num);
	return acc + (Number.isNaN(n) ? 0.0 : n);
};

export const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));
