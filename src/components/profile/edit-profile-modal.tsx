import { Edit2Icon } from 'lucide-react';
import { type PropsWithChildren, Suspense } from 'react';

import { Button } from '../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';

import { EditProfileForm } from './edit-profile-form';

type EditProfileModalProps = PropsWithChildren<{
	userId: string;
	hasSetName: boolean;
}>;

export const EditProfileModal = ({
	userId,
	hasSetName
}: EditProfileModalProps) => (
	<Dialog>
		<DialogTrigger asChild>
			<Button TrailingIcon={Edit2Icon}>Edit profile</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="text-left">Edit profile</DialogTitle>
				{!hasSetName && (
					<DialogDescription>
						Changing first and last name will result in overwriting the Github
						name
					</DialogDescription>
				)}
				{/* Element just for programatical closing of the modal (instead of useState) */}
				<DialogClose id="closeEditProfileModal" />
			</DialogHeader>
			<Suspense
				fallback={
					<div className="space-y-4">
						<Skeleton className="h-9" />
						<Skeleton className="h-9" />
						<Skeleton className="h-9" />
					</div>
				}
			>
				<EditProfileForm userId={userId} />
			</Suspense>
		</DialogContent>
	</Dialog>
);
