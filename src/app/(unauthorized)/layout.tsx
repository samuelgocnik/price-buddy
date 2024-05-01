import { type PropsWithChildren } from 'react';

const UnathorizedLayout = ({ children }: PropsWithChildren) => (
	<div className="mx-auto flex h-full w-full flex-1 flex-col items-center justify-center p-4 md:w-[30rem]">
		{children}
	</div>
);

export default UnathorizedLayout;
