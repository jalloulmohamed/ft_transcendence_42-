"use client"
import { Conversation, ConversationSideBarContainer, ConversationSideBarItem } from "@/app/utils/styles"
import { ConversationTypes, User, UsersType, UsersTypes } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FC, useState, useEffect ,useContext} from "react";
import "./style.css"
import { getAuthUser, getConversation, getUnreadMessages } from "@/app/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchConversationThunk } from "@/app/store/conversationSlice";
import { formatRelative } from "date-fns";
import {IoMdAdd} from 'react-icons/io'
import CreateConversationModal  from "../modals/CreateConversationModal";
import {socketContext } from "@/app/utils/context/socketContext";
import { fetchMessagesThunk } from "@/app/store/messageSlice";
import { fetchAuthUser } from "@/app/store/AuthSlice";
import { fetchMessagesUnreadThunk } from "@/app/store/UnreadMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { fetchBlockFriendThunk } from "@/app/store/blockSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChatComponnent  = () =>{
	const ToastError = (message: any) => {
		toast.error(message, {
		  position: toast.POSITION.TOP_RIGHT,
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		});
	  };
	
	  const ToastSuccess = (message: any) => {
		toast.success(message, {
		  position: toast.POSITION.TOP_RIGHT,
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		});
	  };

	const socket = useContext(socketContext).socket
    const router = useRouter();
	const [show, setShow] = useState<any>(false);
	const [ user, setUser] = useState<User | undefined>();
    const { updateChannel, channel } = useContext(socketContext);
	const [oldId,setOldId] = useState(null); 
	const dispatch = useDispatch<AppDispatch>();
	const [unreadConversations, setUnreadConversations] = useState<Set<string>>(new Set());
	const { conversations, status, error } = useSelector((state:any) => state.conversations);
	const { UsersAuth, statusUsers, errorUsers } = useSelector((state:any) => state.UsersAuth);
	const { messagesUnread, statusmessagesUnread, errormessagesUnread } = useSelector((state:any) => state.messagesUnread);
	const [openMenuId, setOpenMenuId] = useState<string | null>(null);
	const handleMenuClick = (conversationId: string) => {
        setOpenMenuId(openMenuId === conversationId ? null :conversationId);
    };

	
    useEffect(() => {
      dispatch(fetchConversationThunk());
	  dispatch(fetchAuthUser())
    }, [UsersAuth]);

	useEffect(()=>{
		
		socket.on('onMessage', (messages : any)=>{
			dispatch(fetchConversationThunk());
			dispatch(fetchAuthUser())
            dispatch(fetchMessagesThunk(channel?.id));

			const isRecipient = messages.participents.recipient.display_name === UsersAuth.display_name;
			if (isRecipient) {
				setUnreadConversations((prevUnread) => new Set(prevUnread.add(messages.participentsId)));
			}
			
		})

		return () =>{
			socket.off('onMessage');
		}
	},[UsersAuth, channel?.id])

    const getDisplayUser = (conversation : ConversationTypes) => {
		let test; 
			const userId = UsersAuth?.display_name;
			
			if(conversation.sender.display_name !== userId)
			{
				test = conversation.sender
			}else
				test = conversation.recipient;
		return test;
	}


	



	const getDisplayLastMessage = (conversation : ConversationTypes) =>{

		let lastMessage = null;
		lastMessage = conversation.lastMessage;
		if(lastMessage == null)
			return null;
		else
			return lastMessage.content;
		
	}
	
	const isUnread = (conversationId: string) => {
		return unreadConversations.has(`${conversationId}`)
	}
	// async function handleClick(conversation : ConversationTypes){
	// 	updateChannel(conversation);
	// 	markConversationAsRead(conversation.id);

	// 	await getUnreadMessages(conversation.id);
	// 	dispatch(fetchMessagesUnreadThunk(conversation.id)); 
	// 	dispatch(fetchMessagesThunk(conversation.id)); 
	
	// 	// const isRecipient = conversation.recipient.display_name === UsersAuth.display_name;
	// 	// if (isRecipient) {
	// 	//   setUnreadConversations((prevUnread) => new Set(prevUnread.add(conversation.id)));
	// 	// }
	//   };

	const markConversationAsRead = (conversationId: string) => {
		const updatedUnreadConversations = new Set(unreadConversations);
		updatedUnreadConversations.delete(`${conversationId}`);
		setUnreadConversations(updatedUnreadConversations);
	  };
	  const handlleBloque = async (id: string) => {
      
		try {
		  await dispatch(fetchBlockFriendThunk(id));
			ToastSuccess("You have blocked this friend successfully");
  
		} catch (error) {
			
			ToastError("Failed to block the friend. Please try again.");
  
		}
	  };
  

    return (
        <div className="text-black  my-10 h-[calc(100%-200px)] overflow-auto ">
			<ToastContainer />

			{show &&  <CreateConversationModal   setShow={setShow} />   }

		<div className="flex p-2 gap-px px-20  border-solid border-2 ">
			<h1 className=" text-lg p-2 font-bold  text-blue-500">Private Messages</h1>
			<button onClick={() => {setShow(!show)}} className=" absolute right-5 p-4 bg-[#fc7785] rounded-full" ><IoMdAdd /></button>
		</div>
			<div className="p-2">
				{conversations.map(function(elem : ConversationTypes){
						function handleClick()
						{
							updateChannel(elem)
							dispatch(fetchMessagesThunk(elem.id));
							markConversationAsRead(elem.id);

						}
						function handleClickUser()
						{
							router.push(`/dashboard/${elem.recipientId}`)
						}
						return(
							<div onClick={handleClick}  key={elem.id}  className={`cursor-pointer rounded-lg hover:bg-[#F2F3FD] ${
								isUnread(elem.id) ? 'bg-rose-300' : ''
							  } flex items-start justify-between px-2 py-3`}>
								<div className="flex items-center justify-start" key={elem.id}>
								<Image src={getDisplayUser(elem)?.avatar_url} className="h-10 w-10 rounded-[50%] bg-black min-[1750px]:h-12 min-[1750px]:w-12" alt="Description of the image" width={60}   height={50} />
									<div className="ml-4">
					 					<span className="ConversationName">{getDisplayUser(elem)?.username} {getDisplayUser(elem)?.display_name}</span>
										<span className="lastName">{getDisplayLastMessage(elem)}</span>

					 				</div>
								</div>
								<div className="absolute right-5 p-4">
				          			<FontAwesomeIcon icon={faChevronDown} size="2x" className={`text-black transform cursor-pointer text-1xl duration-500 ease-in-out hover:text-[--pink-color] lg:text-3xl }`}
					          				onClick={() => handleMenuClick(elem.id)}
				         			 />
      
                					{openMenuId === elem.id &&
                						<div className={`absolute  top-[-120px] left-2 h-[120px]  w-[200px] flex-col items-center justify-center gap-1 rounded-[15px] border-2 border-solid border-[#000000] bg-white font-['Whitney_Semibold'] `}>
					        				<button className={`bg-[#d9d9d9] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`} onClick={()=> handleClickUser()}>see profile</button>
					        				<button className={` bg-[#d9d9d9] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`}>Delete conversation</button>
                  							<button className={` bg-[#EA7F87] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`} value="Bloque" onClick={()=> handlleBloque(elem.recipientId)}>Bloque</button>

				        			</div>}	
            					</div> 
								<div className="text-black">
									{new Date(elem.createdAt).toLocaleTimeString()}
								</div>
								
							</div>
							
								
						)
					}) }
			</div>
					
			</div>
    )
}

export default ChatComponnent;