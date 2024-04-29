import { redirect } from 'next/navigation';

// TODO: delete this page and move it to middleware
const HomePage = () => {
	redirect('/dashboard');
	return null;
};

export default HomePage;
