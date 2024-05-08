import { type Session } from 'next-auth';
import { Edit2Icon } from 'lucide-react';
import Image from 'next/image';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

const ProfilePage = async () => {
	const session: Session | null = await auth();

	const user = session?.user;
	// Should not happen, but just in case
	if (!user) {
		return <p>You must be logged in to view this page.</p>;
	}

	const hasSetName = user.firstName !== null && user.lastName !== null;

	return (
		<div className="max-md:space-y-4 md:flex md:items-center md:justify-center md:space-x-8">
			<div className="relative h-[10rem] w-[10rem] rounded-full shadow max-md:mx-auto">
				<Image
					src={user.image!}
					alt="User avatar"
					fill
					objectFit="cover"
					className="rounded-full shadow"
				/>
			</div>
			<div className="space-y-4">
				<div className="rounded-lg bg-almond-100 p-4 md:flex md:flex-col md:justify-center">
					{hasSetName ? (
						<>
							<div className="grid grid-cols-[1fr_3fr] gap-x-3">
								<span className="text-right text-blue-smoke-600">
									First name:
								</span>
								<span className="font-medium">{user.firstName}</span>
							</div>
							<div className="grid grid-cols-[1fr_3fr] gap-x-3">
								<span className="text-right text-blue-smoke-600">
									Last name:
								</span>
								<span className="font-medium">{user.lastName}</span>
							</div>
						</>
					) : (
						<div className="grid grid-cols-[1fr_3fr] gap-x-3">
							<span className="text-right text-blue-smoke-600">Name:</span>
							<span className="font-medium">{user.name}</span>
						</div>
					)}
					<div className="grid grid-cols-[1fr_3fr] gap-x-3">
						<span className="text-right text-blue-smoke-600">Email:</span>
						<span className="font-medium">{user.email}</span>
					</div>
				</div>
				<div className="max-md:flex max-md:justify-center">
					<Button TrailingIcon={Edit2Icon}>Edit name</Button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
