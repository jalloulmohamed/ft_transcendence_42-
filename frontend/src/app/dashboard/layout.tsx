"use client";
import { useState, createContext, PropsWithChildren, Component } from "react";
import SideBar from "../components/SideBar";
import TopRightBar from "../components/TopRightBar";
import { io } from "socket.io-client";
import { Provider } from "react-redux";
import { socket, socketContext } from "../utils/context/socketContext";
import { store } from "../store";
import { Socket } from "socket.io-client";
import { usePathname } from "next/navigation";
import { ConversationTypes, User } from "../utils/types";

export const SideBarContext: any = createContext<any>(null);
export const ChangeContext: React.Context<any> = createContext(null);
type Props = {
	// user?: User;
	// setUser : React.Dispatch<React.SetStateAction<User | undefined>>;
	socket: Socket;
};
interface Room {
	id: string;
	name: string;
	Privacy: string;
	password: string;
	picture: string;
	createdAt: string;
	updatedAt: string;
	members: {
		isAdmin: boolean;
	};
}

function AppWithProviders({ children }: PropsWithChildren & Props) {
	const [channel, setChannel] = useState<User | ConversationTypes | null>(null); // Initial value
	const [oldId, setOldId] = useState(null);
	const [Userdata, setUserdata] = useState<User | null>(null);
	const updateChannel = (newAddress: User | ConversationTypes | null) => {
		setChannel(newAddress);
	};
	return (
		<Provider store={store}>
			<socketContext.Provider
				value={{
					socket,
					updateChannel,
					channel,
					oldId,
					setOldId,
					Userdata,
					setUserdata,
				}}
			>
				{children}
			</socketContext.Provider>
		</Provider>
	);
}
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [change, setChange] = useState<{
		sideBar: boolean;
		chatBox: boolean;
		menu: boolean;
	}>({
		sideBar: false,
		chatBox: false,
		menu: false,
	});

	const changeValues = { change, setChange };
	const pathName = usePathname();
	return (
		<html lang="en">
			<body>
				<div className="flex h-screen w-full text-white">
					<AppWithProviders socket={socket}>
						{pathName.endsWith("/online_game") ||
						pathName.endsWith("/bot_game") ? null : (
							<SideBar
								sideBar={change.sideBar}
								onClick={() =>
									setChange({
										...change,
										sideBar: !change.sideBar,
										chatBox: false,
										menu: false,
									})
								}
							/>
						)}

						<TopRightBar
							menu={change.menu}
							onClick={() =>
								setChange({
									...change,
									sideBar: false,
									chatBox: false,
									menu: !change.menu,
								})
							}
						/>

						{/* <div className="mt-[70px] h-[85%] w-full lg:flex lg:items-center lg:justify-evenly min-[1750px]:ml-72 min-[1750px]:mt-[90px] min-[1750px]:w-[86%]">
						{children}
					</div> */}

						<ChangeContext.Provider value={changeValues}>
								<div className="h-full w-full">{children}</div>
						</ChangeContext.Provider>
					</AppWithProviders>
				</div>
			</body>
		</html>
	);
}
