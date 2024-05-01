export const generateMockExpenses = (count: number) => {
	const expenses = [];
	for (let i = 0; i < count; i++) {
		const expense = {
			id: i + 1, // Generate unique ID for each expense
			amount: Math.floor(Math.random() * 100) + 1, // Generate random amount between 1 and 100
			title: `Expense ${i + 1}`, // Generate a unique title for each expense
			groupId: Math.floor(Math.random() * 5) + 1, // Generate random group ID between 1 and 5
			paidById: Math.floor(Math.random() * 10) + 1, // Generate random paid by user ID between 1 and 10
			categoryId: Math.floor(Math.random() * 3) + 1, // Generate random category ID between 1 and 3
			createdAt: new Date().toISOString(), // Use current timestamp as createdAt value
			deletedAt: null
		};
		expenses.push(expense);
	}
	return expenses;
};

export const generateMockGroups = (count: number) => {
	const groups = [];
	for (let i = 0; i < count; i++) {
		const group = {
			id: i,
			name: i % 2 === 0 ? 'Roommates' : 'Family',
			createdAt: '2021-01-01T00:00:00.000Z',
			deletedAt: null
		};
		groups.push(group);
	}
	return groups;
};
