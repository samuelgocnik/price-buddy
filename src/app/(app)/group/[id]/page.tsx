const Group = () => {
	const groupName = "Group Name";

	const messages = [
		{
			id: 1,
			text: "Hey Bob, pay me 500$?",
			isIncoming: true,
			avatar:
				"https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
		},
		{
			id: 2,
			text: "Hi Alice, sending you 500$",
			isIncoming: false,
			avatar:
				"https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
		},
		{
			id: 3,
			text: "Hi Alice, can you lend me 100$ for shopping?",
			isIncoming: false,
			avatar:
				"https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
		},
		{
			id: 4,
			text: "Hi Bob, sending you 100$. Give it back in a week",
			isIncoming: true,
			avatar:
				"https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
		},
	];

	return (
		// <!-- Main Chat Area -->
		<div className="flex flex-col h-screen">
			{/* <!-- Chat Header --> */}
			<header className="bg-white p-4 text-gray-700 flex justify-center">
				<h1 className="text-2xl font-semibold">{groupName}</h1>
			</header>

			{/* <!-- Chat Messages --> */}
			<div className="flex-1 overflow-y-auto p-4 pb-36">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.isIncoming ? "mb-4" : "justify-end mb-4"
						} cursor-pointer`}
					>
						{/* Incomming message has Avatar on left */}
						{message.isIncoming && (
							<div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
								<img
									src={message.avatar}
									alt="User Avatar"
									className="w-8 h-8 rounded-full"
								/>
							</div>
						)}
						<div
							className={`flex max-w-96 ${
								message.isIncoming ? "bg-white" : "bg-indigo-500 text-white"
							} rounded-lg p-3 gap-3`}
						>
							<p className={message.isIncoming ? "text-gray-700" : ""}>
								{message.text}
							</p>
						</div>
						{/* My message has Avatar on right */}
						{!message.isIncoming && (
							<div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
								<img
									src={message.avatar}
									alt="My Avatar"
									className="w-8 h-8 rounded-full"
								/>
							</div>
						)}
					</div>
				))}
			</div>

			{/* <!-- Chat Input --> */}
			{/* <div className="bg-white border-t border-gray-300 p-4">
				<div className="max-w-3xl mx-auto flex items-center">
					<input
						type="text"
						placeholder="Type a message..."
						className="flex-1 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
					/>
					<button
						type="submit"
						className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
					>
						Send
					</button>
				</div>
			</div> */}

			{/* <!-- Transaction Button --> */}
			<div className="bg-white border-t border-gray-300 p-4">
				<div className="max-w-3xl mx-auto flex justify-center">
					<button
						type="submit"
						className="bg-indigo-500 text-white px-4 py-2 rounded-md"
					>
						Create Transaction
					</button>
				</div>
			</div>
		</div>
	);
};

export default Group;
