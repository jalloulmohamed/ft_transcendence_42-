"use client"

import CoversationSideBar from "@/app/components/CoversationSideBar/ConversationSideBar";
import { ConversationChannelStyle, Page} from "@/app/utils/styles";
import { useContext, useEffect, useState , PropsWithChildren} from "react";
import { ConversationTypes, User, messageEventPayload, messageTypes } from "@/app/utils/types";
import { getAuthUser, getConversation, getConversationMessage } from "@/app/utils/api";
import { useParams } from "next/navigation";
import MessagePanel from "@/app/components/messages/MessagePanel";
import TopRightBar from "@/app/components/TopRightBar";
import SideBar from "@/app/components/SideBar";
import { socket, socketContext } from "@/app/utils/context/socketContext";
import { Socket } from "socket.io-client";
import { AppDispatch, RootState, store } from "@/app/store";
import {Provider as ReduxProvider, useDispatch, useSelector} from 'react-redux'
import { fetchMessagesThunk } from "@/app/store/messageSlice";
import { fetchConversationThunk } from "@/app/store/conversationSlice";
import { getAllRooms } from "@/app/store/roomsSlice";


const ConversationChannelPage = () => {
  const {channel } = useContext(socketContext);
  const socket = useContext(socketContext).socket
  const dispatch= useDispatch<AppDispatch>();

	useEffect(()=>{
		console.log("socket")
    socket.on('connect', () => {
			console.log('Socket connected:', socket.id);
		  });
  
		socket.on("notification",(payload:any) =>{
      console.log(payload)
			dispatch(getAllRooms())
		})
	},[socket])
    return ( 
            <div className=" flex h-screen  xl:container xl:mx-auto">
              <div className={`h-full  xl:p-10 xl"pl-5 xl:pr-2 ${!channel ? 'block w-full xl:w-[35%]  ' : 'hidden xl:block  xl:w-[35%] '}`}>
                <CoversationSideBar />
              </div> 
              {channel ? 
                 <div className="bg-white xl:m-10  xl:mr-10 xl:ml-2 w-full xl:w-[65%]  xl:rounded-[20px] xl:mt-32">
                    <MessagePanel></MessagePanel> 
                </div>
:
              <div className="xl:my-10 xl:mr-10  w-full xl:ml-2 xl:w-[65%]   xl:mt-32 hidden xl:flex items-center justify-center">Invit friend to new chat rome</div>
              }
              </div>
     );
}
 
export default ConversationChannelPage;