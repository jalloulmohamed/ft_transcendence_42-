"use client";
import { useState, createContext, PropsWithChildren, Component } from "react";
import SideBar from "../components/SideBar";
import TopRightBar from "../components/TopRightBar";

import { Provider } from "react-redux";
import { socket, socketContext } from "../utils/context/socketContext";
import { store } from "../store";
import { Socket } from "socket.io-client";

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
	password:string;
	picture: string;
	createdAt: string;
	updatedAt: string;
	members: {
	  isAdmin: boolean;
	};
}


function AppWithProviders({ children }: PropsWithChildren & Props) {
	const [channel, setChannel] = useState<Room | null>(null); // Initial value

	const updateChannel = (newAddress:string) => {
	  setChannel(newAddress);
	};

	return (
		<Provider store={store}>
			<socketContext.Provider value={{socket,updateChannel,channel}}>{children}</socketContext.Provider>
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

	// if (Component.getLayout)
		

	return (
		<html lang="en">
			<body>
				<div className="flex h-screen w-full text-white">
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

					<AppWithProviders socket={socket}>
						<ChangeContext.Provider value={changeValues}>
							<div className="h-full w-full">{children}</div>
						</ChangeContext.Provider>
					</AppWithProviders>
				</div>
			</body>
		</html>
	);
}
