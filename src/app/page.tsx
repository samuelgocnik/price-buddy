import { auth } from '@/auth';
import { SignInButton } from '@/components/auth/signin-button';
import { SignOutButton } from '@/components/auth/signout-button';

const Home = async () => {
	const session = await auth();

	console.log('session', session);

	return (
		<main className="">
			{session?.user?.email}
			{session?.user?.email ? <SignOutButton /> : <SignInButton />}
		</main>
	);
};

export default Home;
