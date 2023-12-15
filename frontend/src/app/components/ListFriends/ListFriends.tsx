import { AppDispatch } from "@/app/store";
import { createConversationThunk, fetchConversationUserThunk } from "@/app/store/conversationSlice";
import { getAllFriends } from "@/app/utils/api";
import { Conversation, ConversationSideBarContainer, ConversationSideBarItem } from "@/app/utils/styles";
import { CreateConversationParams, FriendsTypes } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuButton, MenuButton2 } from "../Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChevronDown, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import RightBarUsers from "../RightBarUsers";
import Image from "next/image";
import { fetchBlockFriendThunk } from "@/app/store/blockSlice";
import { fetchGetAllFriendsThunk } from "@/app/store/friendsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socketContext } from "@/app/utils/context/socketContext";
import { fetchMessagesThunk } from "@/app/store/messageSlice";


const ListFriends = () => {
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


    const [Friends, setFriends] = useState<FriendsTypes[]>([]);
    const { updateChannel, channel } = useContext(socketContext);

    const dispatch = useDispatch<AppDispatch>();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [change, setChange] = useState<{
      sideBar: boolean;
      chatBox: boolean;
      menu: boolean;
    }>({
      sideBar: false,
      chatBox: false,
      menu: false,
    });


  
   
   
      const { friends, status, error } = useSelector((state:any) => state.friends);
    
      useEffect(() => {
        dispatch(fetchGetAllFriendsThunk());
      }, [dispatch]);

      const router = useRouter();
       const handleFunction = (friends : FriendsTypes) =>{

        let display_name ;
        display_name  = friends.display_name;
        return display_name;

      }
     
      const handleMenuClick = (friendId: string) => {
          setOpenMenuId(openMenuId === friendId ? null : friendId);
      };

      const handlleBloque = async (id: string) => {
      
        try {
          await dispatch(fetchBlockFriendThunk(id));
            ToastSuccess("You have blocked this friend successfully");

        } catch (error) {
          ToastError("Failed to block the friend. Please try again");

        }

      };
      
     
    return (
        <Conversation>
          <ToastContainer />
				<ConversationSideBarContainer>
					{friends.map(function(elem : FriendsTypes){
            const handleSendMessage = async () =>
            {

                  dispatch(fetchConversationUserThunk(elem.display_name))
                    .unwrap()
                    .then(({data}) => {
                      updateChannel(data);
                      dispatch(fetchMessagesThunk(data.id));

                  }).catch((err)=>{
                      console.log(err);
                  }
                );

            }
						return(
							<ConversationSideBarItem key={elem.id}>
                <Image src={elem.avatar_url} className="h-14 w-14 rounded-[50%] bg-black " alt="Description of the image" width={60}   height={60} />

								<div>
					 				<span  className="ConversationName">{elem.username} {elem.display_name}</span>
					 			</div>
                   
  
                 <div className="absolute right-5 p-4">
				          <FontAwesomeIcon icon={faEllipsis} className={`text-black transform cursor-pointer text-2xl duration-500 ease-in-out hover:text-[--pink-color] lg:text-3xl }`}
					          onClick={() => handleMenuClick(elem.id)}
				          />
      
                {openMenuId === elem.id &&
                <div className={`absolute  top-[-120px] left-2 h-[120px]  w-[200px] flex-col items-center justify-center gap-1 rounded-[15px] border-2 border-solid border-[#000000] bg-white font-['Whitney_Semibold'] `}>
					        <button className={`bg-[#d9d9d9] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`}>see profile</button>
					        <button className={` bg-[#d9d9d9] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`} onClick={()=>handleSendMessage()}>send message</button>
                  <button className={` bg-[#EA7F87] text-black h-[35px] w-[197px] rounded-[15px] hover:bg-[rgba(0,0,0,.2)]`} value="Bloque" onClick={()=> handlleBloque(elem.id)}>Bloque</button>

				        </div>}
            </div> 
							</ConversationSideBarItem>
								
						)
					}) }
				</ConversationSideBarContainer>
			</Conversation>
           
    )

}

export default ListFriends;