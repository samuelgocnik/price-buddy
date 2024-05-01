import Link from 'next/link';

import { auth } from '@/auth';
import { cn } from '@/lib/cn';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SignOutButton } from '../auth/signout-button';

type ProfileDropdownProps = {
	dropdownAlign?: 'start' | 'end';
	showName?: boolean;
};

const ProfileDropdown = async ({
	showName = false,
	dropdownAlign = 'start'
}: ProfileDropdownProps) => {
	const session = await auth();

	// Should not happen
	if (!session?.user) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(showName && 'flex items-center gap-4')}
			>
				<Avatar>
					{session.user.image && (
						<AvatarImage src={session.user.image} alt="profile picture" />
					)}
					<AvatarFallback className="bg-almond-400">U</AvatarFallback>
				</Avatar>
				{showName && <div className="font-medium">{session.user.name}</div>}
			</DropdownMenuTrigger>
			<DropdownMenuContent align={dropdownAlign}>
				<DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile" className="block w-full hover:cursor-pointer">
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<SignOutButton variant="ghost" size="sm" className="w-full" />
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
