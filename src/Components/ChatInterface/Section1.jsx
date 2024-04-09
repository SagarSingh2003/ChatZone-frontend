import Header from "./Header/Header";
import {useContext , useEffect} from 'react';
import ListOfCreatedServers from "./Section1Components/ListOfCreatedServers";
import ListOfJoinedServers from "./Section1Components/ListOfJoinedServers";
import AccountDetails from "./Section1Components/AccountDetails";
import LightDarkMode from "./Section1Components/LightDarkMode";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";

export default function Section1({ server_id , setRefreshChatPage}) {

  


  return (
    <section className=" flex flex-col justify-between items-center bg-[black] h-[100%]">
      <section className="h-[70%] flex flex-col w-full items-center ml-[3px] mr-[3px]">
        <section className=" h-[50%] overflow-y-auto overflow-x-hidden w-full flex flex-col items-center mb-[20px] ">
          {/* <span className="text-white text-[10px] text-[#606570] pt-[10px] pb-[10px]  font-bold fixed">Created Servers</span> */}
          <section className="mt-[30px]">
            <ListOfCreatedServers server_id={server_id} setRefreshChatPage={setRefreshChatPage}/>
            
          </section>
        </section>
        <section className="h-[50%] overflow-y-auto overflow-x-hidden w-full flex flex-col items-center">
          {/* <span className="text-white text-[10px] pt-[10px] text-[#606570] pb-[10px]  fixed font-bold">Joined Servers</span> */}
          <section className="mt-[30px]">
            <ListOfJoinedServers server_id={server_id} setRefreshChatPage={setRefreshChatPage}/>
          </section>
        </section>
      </section>
      <section className="h-[20%] w-full flex flex-col justify-evenly items-center bg-[#1E222A]">
        <AccountDetails />
        <LightDarkMode />
      </section>
    </section>
  );
}
