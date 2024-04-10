'use client';

import React from 'react';
import { CoinsIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => (
	<div className="p-4 md:p-8 flex items-center justify-center h-screen">
		<div className="bg-almond-200 md:h-[30vh] md:px-16 md:py-6 py-8 px-4 w-full md:w-auto md:space-x-16 space-y-8 md:space-y-0 rounded-xl flex flex-col md:flex-row items-center shadow-md">
			<div className="flex flex-col items-center space-y-8">
				<CoinsIcon className="h-20 w-20 text-primary" />
				<div className="text-xl font-medium">PriceBuddy</div>
			</div>
			<Separator orientation="vertical" className="hidden md:block" />
			<Separator className="my-4 block md:hidden" />
			<div className="flex w-full flex-col md:min-w-72 space-y-2">
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
