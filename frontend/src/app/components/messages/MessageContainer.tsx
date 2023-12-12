import {MessageContainerStyle, MessageItemAvatar, MessageItemContainer, MessageItemContent, MessageItemDetails, MessageItemHeader} from "@/app/utils/styles"
import { User, messageTypes } from "@/app/utils/types";
import { FC, useEffect, useState,useContext } from "react";
import {formatRelative} from 'date-fns'
import { getAuthUser } from "@/app/utils/api";
import MessageInputField from "./MessageInputField";
import {socketContext } from "@/app/utils/context/socketContext";
import {getConversationMessage} from '@/app/utils/api'
import Image from  'next/image'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { MessagesState, fetchMessagesThunk } from "@/app/store/messageSlice";




const MessageContainer = () => {
    const [setLoadloadinging] = useState<boolean>(false);
    // const [Message,setMessage] = useState<messageTypes[]>([]);
    const controller = new AbortController();
    const { channel } = useContext(socketContext);
    const { oldId,setOldId } = useContext(socketContext);
    const socket  = useContext(socketContext).socket;
    const {Userdata} = useContext(socketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { messages, status, error } = useSelector((state:any) => state.messages);

    useEffect(() => {
        const id = channel.id;

        dispatch(fetchMessagesThunk(id));
        joinRoom(id);

      //   console.log("the user here-->", UsersAuth);
      }, [channel.id]);
  


    const joinRoom =(id:string) =>{
		if(oldId)
			socket.emit("leaveToRoom",{id:oldId})
		socket.emit("joinToRoom",{id:id})
        setOldId(id);
	}


    // useEffect(() => {
    //     const id = channel.id;
    //     getConversationMessage(id)
    //       .then(( data :any) => {
    //         setMessage(data.data);
    //         joinRoom(id);
    //       })
    //       .catch((err:any) => console.log(err));
    // }, [channel.id]);
    
    return (

       <>
        <div className="h-[calc(100%-135px)]   overflow-auto py-3">
            <MessageContainerStyle>
                {messages.map((m : messageTypes) =>(
                    <MessageItemContainer key={m.id}>
                        <Image src={m.sender?.avatar_url} className="h-10 w-10 rounded-[50%] bg-black " alt="Description of the image" width={60}   height={60} />

                        <MessageItemDetails>
                                <MessageItemHeader key={m.id}>
                                    <span className="senderName" style={{color : Userdata?.id === m.sender.id ? '#8982a6' : '#778ba5'}}>
                                        {m.sender.username}
                                    </span>
                                    <span className="time">
                                        {formatRelative(new Date(m.createdAt), new Date())}
                                    </span>
                                    </MessageItemHeader>
                                    <MessageItemContent>{m.content}</MessageItemContent>
                        </MessageItemDetails>

            </MessageItemContainer>
            ) )}
            </MessageContainerStyle>

        </div>
            <MessageInputField  />
        </>
        )
}

export default MessageContainer; 
