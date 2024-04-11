'use client';

import React from 'react';
import { CoinsIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => (
	<div className="flex h-screen items-center justify-center p-4 md:p-8">
		<div className="flex w-full flex-col items-center space-y-8 rounded-xl bg-almond-200 px-4 py-8 shadow-md md:h-[30vh] md:w-auto md:flex-row md:space-x-16 md:space-y-0 md:px-16 md:py-6">
			<div className="flex flex-col items-center space-y-8">
				<CoinsIcon className="h-20 w-20 text-primary" />
				<div className="text-xl font-medium">PriceBuddy</div>
			</div>
			<Separator orientation="vertical" className="hidden md:block" />
			<Separator className="my-4 block md:hidden" />
			<div className="flex w-full flex-col space-y-2 md:min-w-72">
				<div>
					<Label>Username</Label>
					<Input placeholder="Jozef" />
				</div>
				<div>
					<Label>Password</Label>
					<Input placeholder="*********" type="password" />
				</div>
				<Button variant="default">Login</Button>
				<Button variant="link">Register</Button>
			</div>
		</div>
	</div>
);

export default LoginPage;
