import { CircleUser, Menu, Package2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
	const navigationLinks = [
		{ href: "#", text: "Dashboard" },
		{ href: "#", text: "Groups" },
		{ href: "#", text: "My Finances" },
		{ href: "#", text: "Categories" },
	];

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				{navigationLinks.map((link) => (
					<Link
						key={link.text}
						href={link.href}
						className="text-lg font-semibold md:text-base flex items-center gap-2"
					>
						<Package2 className="h-6 w-6" />
						<span className="sr-only">{link.text}</span>
						{link.text}
					</Link>
				))}
			</nav>
			{/* Dropdown navigation for mobile */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<nav className="grid gap-6 text-lg font-medium">
						{navigationLinks.map((link) => (
							<Link
								key={link.text}
								href={link.href}
								className="hover:text-foreground flex items-center gap-2"
							>
								<Package2 className="h-6 w-6" />
								<span className="sr-only">{link.text}</span>
								{link.text}
							</Link>
						))}
					</nav>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Profile on the right side */}
			<div className="flex items-center gap-4 ml-auto">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
