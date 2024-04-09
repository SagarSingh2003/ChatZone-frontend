import { AccountDataContext } from "../../../Context/AccountData";
import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";
import { useContext, useEffect, useState } from "react";

export default function ListOfChannels({
  server_id,
  socket,
  roomsData,
  setRoomsData,
  createRoom,
  setCurrentRoomId,
  currentRoomId,
  accountData,
}) {


  console.log("rooooooooooomssssssssssssssssssssssssss data--------------------------- : " , roomsData);
   

  const { allMessagesData , joinedServerRooms, createdServerRooms, setCreatedServerRooms } =
    useContext(ServerAndRoomContext);

  console.log(
    joinedServerRooms,
    createdServerRooms,
    "joined and created server rooms",
  );

  const allRooms = joinedServerRooms.concat(createdServerRooms);

  useEffect(() => {
    console.log("calculating this thing again" , server_id);
    console.log(roomsData.length);
    for (let eachRoom of allRooms) {
      if (eachRoom.server_id === server_id ) {
        console.log("calling", eachRoom.server_id);
        console.log(eachRoom.room);
        console.log(eachRoom);
        setRoomsData(eachRoom.room);
        console.log(roomsData, ")))))))))))))))))))))))))))))");
      } else if (roomsData.length !== 0) {
        setRoomsData((data) => data);
      }
    }
  }, [joinedServerRooms, createdServerRooms , server_id]);

  function joinRoom(socket, room_id, accountData) {
    socket.emit("join-room", { room_id: room_id, accountData: accountData });
    console.log("emitted join-room");
    setCurrentRoomId(room_id);
  }

  
  console.log(roomsData, "rooms data of length : ", roomsData.length);

  return (
    
    <>
        <section className="font-bold text-white pt-[30px] w-full flex justify-center items-center underline  underline-offset-[20px] mb-[20px] decoration-[#0A879E]">
                Text Channels
        </section>
        <section className="flex flex-col items-center ">
          {roomsData.length !== 0
            ? !roomsData[0][0]
              ? roomsData.filter((eachroom) => (eachroom.room_name).slice(0 , 48) !== "Videosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" && (eachroom.room_name).slice(0 , 48) !== "Audiosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd").map((eachroom) => (
                  eachroom.room_id === currentRoomId ?
                  <span
                    onClick={() => {
                      socket.emit("leave-room", currentRoomId);
                      console.log(
                        eachroom.room_id,
                        "room_id---------------------------",
                      );
                      joinRoom(
                        socket,
                        eachroom.room_id,
                        accountData[0],
                        setCurrentRoomId,
                      );
                    }}
                    className=" bg-[white] flex flex-row justify-between pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] shadow-[0_0px_20px_rgba(10,11,16,1)]  text-[black]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "")}
                {/* // notification logi/c */}
                    {/* <section>
                        {localStorage.setItem(eachroom.room_id , eachroom.messages.length)} 
                    </section> */}
                    
                  </span> 
                  :
                  <span
                    onClick={() => {
                      socket.emit("leave-room", currentRoomId);
                      console.log(
                        eachroom.room_id,
                        "room_id---------------------------",
                      );
                      joinRoom(
                        socket,
                        eachroom.room_id,
                        accountData[0],
                        setCurrentRoomId,
                      );
                    }}
                    className=" hover:bg-[white] hover:text-black flex flex-row justify-between pr-[15px] pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] hover:shadow-[0_0px_20px_rgba(10,11,16,1)] bg-[black] text-[#5D626D]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "")}
                    
                  </span>
                ))

                //notification logic : 

                // <section className="text-white ">
                //     {localStorage.getItem(`${eachroom.room_id}`) ?  
                //     (eachroom.messages.length - Number(localStorage.getItem(`${eachroom.room_id}`)) === 0 ? 
                //     null : 
                //     <span className="border border-[#B40C1F] text-[14px] pl-[5px] pr-[5px] rounded-full bg-[#B40C1F]">
                //     {eachroom.messages.length - Number(localStorage.getItem(`${eachroom.room_id}`))}
                //     </span> ) : (eachroom.messages.length === 0 ? null : <span className="border border-[#B40C1F] text-[14px] pl-[5px] pr-[5px] rounded-full bg-[#B40C1F]">{eachroom.messages.length}</span>)} 
                //     </section>

              : roomsData[0].map((eachroom) => (
                  eachroom.room_id === currentRoomId ? 
                  <span
                  onClick={() => {
                    console.log("reaching here ................");
                    socket.emit("leave-room", currentRoomId);
                    joinRoom(
                      socket,
                      eachroom.room_id,
                      accountData[0],
                      setCurrentRoomId,
                    );
                  }}
                  className="pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] shadow-[0_0px_20px_rgba(10,135,158,0.25)] text-white"
                  key={eachroom.id}
                >
                    {eachroom.room_name?.replace(server_id, "")}
                  </span> 
                  :
                  <span
                  onClick={() => {
                    console.log("reaching here ................");
                    socket.emit("leave-room", currentRoomId);
                    joinRoom(
                      socket,
                      eachroom.room_id,
                      accountData[0],
                      setCurrentRoomId,
                    );
                  }}
                  className="pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] hover:shadow-[0_0px_20px_rgba(10,135,158,0.25)] text-white"
                  key={eachroom.id}
                >
                  {eachroom.room_name?.replace(server_id, "")}
                </span>
                ))
            : null}
        </section>
        <section>
              <section className="font-bold text-white pt-[30px] w-full flex justify-center items-center underline  underline-offset-[20px] mb-[20px] decoration-[#0A879E]">
                Audio Channels
              </section>
              <section className="flex flex-col items-center ">
          {roomsData.length !== 0
            ?  roomsData.filter((eachroom) => ((eachroom.room_name).slice(0 , 48)) === "Audiosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd").map((eachroom) => (
                  eachroom.room_id === currentRoomId ?
                  <span
                    // this is socket logic ----
                    // onClick={() => {
                    //   socket.emit("leave-room", currentRoomId);
                    //   console.log(
                    //     eachroom.room_id,
                    //     "room_id---------------------------",
                    //   );
                    //   joinRoom(
                    //     socket,
                    //     eachroom.room_id,
                    //     accountData[0],
                    //     setCurrentRoomId,
                    //   );
                    // }}
                    className=" bg-[white] flex flex-row justify-between pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] shadow-[0_0px_20px_rgba(10,11,16,1)]  text-[black]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "").replace("Audiosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" , "")}
                {/* // notification logi/c */}
                    {/* <section>
                        {localStorage.setItem(eachroom.room_id , eachroom.messages.length)} 
                    </section> */}
                    
                  </span> 
                  :
                  <span
                    // onClick={() => {
                    //   socket.emit("leave-room", currentRoomId);
                    //   console.log(
                    //     eachroom.room_id,
                    //     "room_id---------------------------",
                    //   );
                    //   joinRoom(
                    //     socket,
                    //     eachroom.room_id,
                    //     accountData[0],
                    //     setCurrentRoomId,
                    //   );
                    // }}
                    className=" hover:bg-[white] hover:text-black flex flex-row justify-between pr-[15px] pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] hover:shadow-[0_0px_20px_rgba(10,11,16,1)] bg-[black] text-[#5D626D]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "").replace("Audiosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" , "")}
                    
                  </span>
                  )) : null }
            </section>
              
          </section>
        <section>
              <section className="font-bold text-white pt-[30px] w-full flex justify-center items-center underline  underline-offset-[20px] mb-[20px] decoration-[#0A879E]">
                Video Channels
              </section>
              <section className="flex flex-col items-center ">
          {roomsData.length !== 0
            ?  roomsData.filter((eachroom) => ((eachroom.room_name).slice(0 , 48)) === "Videosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd").map((eachroom) => (
                  eachroom.room_id === currentRoomId ?
                  <span
                    // this is socket logic ----
                    // onClick={() => {
                    //   socket.emit("leave-room", currentRoomId);
                    //   console.log(
                    //     eachroom.room_id,
                    //     "room_id---------------------------",
                    //   );
                    //   joinRoom(
                    //     socket,
                    //     eachroom.room_id,
                    //     accountData[0],
                    //     setCurrentRoomId,
                    //   );
                    // }}
                    className=" bg-[white] flex flex-row justify-between pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] shadow-[0_0px_20px_rgba(10,11,16,1)]  text-[black]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "").replace("Videosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" , "")}
                {/* // notification logi/c */}
                    {/* <section>
                        {localStorage.setItem(eachroom.room_id , eachroom.messages.length)} 
                    </section> */}
                    
                  </span> 
                  :
                  <span
                    // onClick={() => {
                    //   socket.emit("leave-room", currentRoomId);
                    //   console.log(
                    //     eachroom.room_id,
                    //     "room_id---------------------------",
                    //   );
                    //   joinRoom(
                    //     socket,
                    //     eachroom.room_id,
                    //     accountData[0],
                    //     setCurrentRoomId,
                    //   );
                    // }}
                    className=" hover:bg-[white] hover:text-black flex flex-row justify-between pr-[15px] pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] border border-[#1d202f] hover:shadow-[0_0px_20px_rgba(10,11,16,1)] bg-[black] text-[#5D626D]"
                    key={eachroom.id}
                  >
                    # {eachroom.room_name?.replace(server_id, "").replace("Videosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" , "")}
                    
                  </span>
                  )) : null }
            </section>
          
        </section>
    </>
  );
}
