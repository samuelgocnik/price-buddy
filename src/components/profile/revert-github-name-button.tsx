'use client';

import { useRevertToGithubName } from '@/mutations/profile';
import { type User } from '@/db/schema/users';

import { Button } from '../ui/button';

type RevertGithubNameButtonProps = {
	userId: User['id'];
};

export const RevertGithubNameButton = ({
	userId
}: RevertGithubNameButtonProps) => {
	const { mutate, isPending: isReverting } = useRevertToGithubName();

	const handleRevert = () => {
		mutate(userId);
	};

	return (
		<Button variant="secondary" onClick={handleRevert}>
			{isReverting ? 'Reverting...' : 'Revert to github name'}
		</Button>
	);
};
