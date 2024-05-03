import Header from '@/components/header/header';

const AppLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<>
		<Header />
		<main className="container mx-auto flex h-full flex-1 flex-col px-4 py-2 md:px-6 md:py-4">
			{children}
		</main>
	</>
);

export default AppLayout;
