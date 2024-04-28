import React from 'react';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const LoginPage = () => (
	<Card className="w-full bg-almond-100">
		<CardHeader>
			<CardTitle className="text-center text-lg">Login</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{/* TODO: replace with proper form, formItems, formLabel etc (check shadcn form) */}
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="text" placeholder="jozo@kubani.sk" />
			</div>
			<div>
				<Label htmlFor="password">Password</Label>
				<Input id="password" type="password" placeholder="******" />
			</div>
		</CardContent>
		<CardFooter className="flex flex-col space-y-4">
			<Button className="w-full">Login</Button>
			<Button variant="link">
				<Link href="/register">Do not have an account? Register</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default LoginPage;
