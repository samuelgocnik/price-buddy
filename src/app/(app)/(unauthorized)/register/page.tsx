import React from 'react';
import Link from 'next/link';

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RegisterPage = () => (
	<Card className="w-full bg-almond-100">
		<CardHeader>
			<CardTitle className="text-center text-lg">Register</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{/* TODO: replace with proper form, formItems, formLabel etc (check shadcn form) */}
			<div>
				<Label htmlFor="firstName">First name</Label>
				<Input id="firstName" type="text" placeholder="Jozef" />
			</div>
			<div>
				<Label htmlFor="lastName">Last name</Label>
				<Input id="lastName" type="text" placeholder="Kubani" />
			</div>
			<div>
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" placeholder="jozo@kubani.sk" />
			</div>
			<div>
				<Label htmlFor="password">Password</Label>
				<Input id="password" type="password" placeholder="******" />
			</div>
			<div>
				<Label htmlFor="password2">Confirm password</Label>
				<Input id="password2" type="password" placeholder="******" />
			</div>
		</CardContent>
		<CardFooter className="flex flex-col space-y-4">
			<Button className="w-full">Register</Button>
			<Button variant="link">
				<Link href="/login">Already have an account? Login</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default RegisterPage;
