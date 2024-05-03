import { MenuIcon } from 'lucide-react';
import { Suspense } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

import Navigation from './navigation';
import ProfileDropdown from './profile-dropdown';

const HamburgerMenu = () => (
	<Sheet>
		<SheetTrigger asChild>
			<Button variant="ghost" className="p-0 hover:bg-transparent">
				<MenuIcon size={32} />
			</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<div>
					<Suspense
						fallback={
							<div className="h-10 w-10 animate-pulse rounded-full bg-almond-100" />
						}
					>
						<ProfileDropdown showName />
					</Suspense>
				</div>
			</SheetHeader>
			<Separator className="my-4" />
			<Navigation />
		</SheetContent>
	</Sheet>
);

export default HamburgerMenu;
