import { type PropsWithChildren } from 'react';

import { AvatarFallback } from './ui/avatar';

export const AvatarBackground = ({ children }: PropsWithChildren<object>) => (
	<div className="h-10 w-10 rounded-full bg-gray-200">{children}</div>
);

// Might be useful to show user initials, instead of having blank element
// use chidren prop for that
export const AvatarBackgroundFallback = ({
	children
}: PropsWithChildren<object>) => (
	<AvatarFallback>
		<AvatarBackground>{children}</AvatarBackground>
	</AvatarFallback>
);
