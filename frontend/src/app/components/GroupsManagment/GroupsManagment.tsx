"use client"
import { IoMdAdd } from "react-icons/io";
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext, useState } from 'react';
import { getAllRooms } from '@/app/store/roomsSlice';
import { socketContext } from "@/app/utils/context/socketContext";
import Image from "next/image";
import { AppDispatch } from "@/app/store";
import ListRome from "./ListRome";
import { ConversationTypes } from "@/app/utils/types";




const GroupsManagement = () => {
  const router = useRouter();
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>();

  const { rooms, status, error } = useSelector((state: any) => state.room);
  const { updateChannel, channel } = useContext(socketContext);
  const [sortedRooms, setSortedRooms] = useState<ConversationTypes[]>([]);
  const [roomsdata, setRoomsData] = useState<ConversationTypes[]>([]);

  useEffect(() => {
    dispatch(getAllRooms())
  }, [dispatch]);

  useEffect(()=>{
    setRoomsData(rooms)
  },[rooms])

  console.log("dasdsadasdasdasdsadsasa")

  // useEffect(() => {
  //   // Sort the rooms when the data changes
  //   const sorted = [...rooms].sort((a, b) => {
  //     if (a.messageRome[0] && b.messageRome[0]) {
  //       return b.messageRome[0].createdAt.getTime() - a.messageRome[0].createdAt.getTime();
  //     } else if (a.messageRome[0]) {
  //       return -1;
  //     } else if (b.messageRome[0]) {
  //       return 1;
  //     }
  //     return b.updatedAt.getTime() - a.updatedAt.getTime();
  //   });

  //   setSortedRooms(sorted);
  // }, [rooms]);

  if (status.get === "loading" || status.get === "idle") {
    return (
      <div className="flex items-center justify-center mt-40">
        <div
          className="text-[#5B8CD3]   h-8 w-8 animate-spin rounded-full border-3 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>);
  }

  if (status.get === 'failed') {
    return <div className="text-gray-500 mt-10 text-center ">{error} </div>;
  }

  return (
		<div className="no-scrollbar  h-[calc(100%-74px)] overflow-auto pb-2 pt-5  text-black">
			{rooms &&
				rooms?.map((data: ConversationTypes) => (
					<div key={data.id}>
						<ListRome data={data}></ListRome>
					</div>
				))}
			<div className="h-32 md:h-32"></div>
		</div>
	);
};

export default GroupsManagement;
