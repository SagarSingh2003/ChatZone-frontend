import { useState, useRef, useEffect, useContext } from "react";
import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";
import chatzone from '../../chatzone.gif';

const api = "http://localhost:8080";

export default function CreateRooms({
  createRoom,
  setCreateRoom,
  setRoomsData,
  server_id,
}) {
  const { setRefreshServerAndRoomData } = useContext(ServerAndRoomContext);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomCreationState, setRoomCreationState] = useState({});
  const channelNameRef = useRef();


  const [maketextRoom , setMakeTextRoom] = useState();
  const [makeAudioRoom , setMakeAudioRoom] = useState();
  const [makeVideoRoom , setMakeVideoRoom] = useState();
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    if (createRoom.confirm) {
      fetch(api + "/user/createRoom", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: localStorage.getItem("Authentication"),
        },
        body: JSON.stringify({
          server_id: server_id,
          room_name: createRoom.roomName,
        }),
      }).then(async (res) => {
        const response = await res.json();
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          setRoomsData((data) => {
            console.log(data, "*******************8");
            return [
              ...data,
              {
                room_name: response.room_name,
                server_id: server_id,
                room_id: response.room_id,
              },
            ];
          });
          setRefreshServerAndRoomData((data) => data + 1);
          setCreateRoom({ confirm: false });
        }
        console.log(response, "response");
        setRoomCreationState(response);
      });
    }
  }, [createRoom]);


  if(roomCreationState && roomCreationState.message){
    setTimeout(() => {setRoomCreationState({}); setMakeTextRoom(false) ; setMakeAudioRoom(false); setMakeVideoRoom(false); setShowCreateRoom(false)} , 2000);

    return (
      <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
          
          <img src={chatzone} alt="" className="h-[150px]"/>

          <span className=" mr-[10px] ml-[30px] flex items-center  font-bold justify-center">
              {roomCreationState.room_name ? <span className="text-[#34BB4C]">{roomCreationState.message}</span> : <span className="text-[#F23F42]">{roomCreationState.message} please try again later..</span>}
          </span>

      </section>
    )
  }
  
  function createTextRoom(){
    setShowCreateRoom(false)  
    setMakeTextRoom(true);
  }

  function createVideoRoom(){
      setShowCreateRoom(false)
      setMakeVideoRoom(true);
  }

  function createAudioRoom(){
    setShowCreateRoom(false)  
    setMakeAudioRoom(true);
  }

  if (showCreateRoom) {
    return(
      <div className="flex flex-col w-[200px] h-[198px] absolute bg-white top-30px right-300px z-[100]">
          <section onClick={createTextRoom} className="transition-color-custom flex flex-row items-center justify-center h-1/3 border-b hover:bg-[#0C0C0D] hover:text-white">
            Text
          </section>
          <section onClick={createAudioRoom} className="transition-color-custom flex flex-row items-center justify-center h-1/3 border-b hover:bg-[#0C0C0D] hover:text-white">
            Audio
          </section>
          <section onClick={createVideoRoom} className="transition-color-custom flex flex-row items-center justify-center h-1/3 border-b hover:bg-[#0C0C0D] hover:text-white">
            Video
          </section>
          <section onClick={() => { setShowCreateRoom((data) => false)}} className="cursor-pointer bg-[#0C0C0D] transition-color-custom flex flex-row items-center justify-center h-1/3 text-white border-b hover:bg-[white] hover:text-black">
            Cancel
          </section>
      </div>
    )
  }

   if (maketextRoom === true){
    return (
      <section >
        {!loading ? 
        <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
          <section>
            <span
              onClick={() => {
                setMakeTextRoom(false);
              }}
              className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px] border border-[white] text-[white] box-border rounded cursor-pointer hover:bg-[white] hover:text-[black]"
            >
              x
            </span>
            <label
              htmlFor="createServer"
              className="font-bold text-[white] p-[10px] text-2xl rounded"
            >
              Enter a Channel Name
            </label>
          </section>
          <section className="flex flex-row justify-evenly w-full">
            <input
              type="text"
              ref={channelNameRef}
              id="createServer"
              className="bg-inherit text-inherit placeholder:font-bold pl-[20px] placeholder:text-inherit"
              placeholder="Enter a channel name"
            />
            <button
              onClick={() => {
                setLoading(true);
                setCreateRoom({
                  confirm: true,
                  roomName: channelNameRef.current.value,
                });
              }}
              className=" border border-[white] bg-[white] text-[black] rounded p-[10px] font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
            >
              Create Text Channel
            </button>
          </section>
        </section>  
        :
        <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
          <img src={chatzone} alt="" className="h-[150px]"/>
        </section> }
      </section>
    );
    
   }else if(makeAudioRoom === true){
    return (
      (!loading ? <section>
        <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
        <section>
          <span
            onClick={() => {
              setMakeAudioRoom(false);
            }}
            className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px] border border-[white] text-[white] box-border rounded cursor-pointer hover:bg-[white] hover:text-[black]"
          >
            x
          </span>
          <label
            htmlFor="createServer"
            className="font-bold text-[white] p-[10px] text-2xl rounded"
          >
            Enter a Channel Name
          </label>
        </section>
        <section className="flex flex-row justify-evenly w-full">
          <input
            type="text"
            ref={channelNameRef}
            id="createServer"
            className="bg-inherit text-inherit placeholder:font-bold pl-[20px] placeholder:text-inherit"
            placeholder="Enter a channel name"
          />
          <button
            onClick={() => {
              setLoading(true);
              setCreateRoom({
                confirm: true,
                roomName: "Audiosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" + channelNameRef.current.value,
              });
            }}
            className=" border border-[white] bg-[white] text-[black] rounded p-[10px] font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
          >
            Create Audio Channel
          </button>
        </section>
      </section>
      </section> 
      : 
      <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
        <img src={chatzone} alt="" className="h-[150px]"/>
      </section>) 
    );
    
   }else if(makeVideoRoom === true){
    return (
      (!loading ? <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
      <section>
        <span
          onClick={() => {
            setMakeVideoRoom(false);
          }}
          className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px] border border-[white] text-[white] box-border rounded cursor-pointer hover:bg-[white] hover:text-[black]"
        >
          x
        </span>
        <label
          htmlFor="createServer"
          className="font-bold text-[white] p-[10px] text-2xl rounded"
        >
          Enter a Channel Name
        </label>
      </section>
      <section className="flex flex-row justify-evenly w-full">
        <input
          type="text"
          ref={channelNameRef}
          id="createServer"
          className="bg-inherit text-inherit placeholder:font-bold pl-[20px] placeholder:text-inherit"
          placeholder="Enter a channel name"
        />
        <button
          onClick={() => {
            setLoading(true);
            setCreateRoom({
              confirm: true,
              roomName: "Videosadlfkjasldflasdjflasdkjflasjdflkjasdfjkasd" + channelNameRef.current.value,
            });
          }}
          className=" border border-[white] bg-[white] text-[black] rounded p-[10px] font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
        >
          Create Video Channel
        </button>
      </section>
      
    </section>
     :
     <section className="z-[100] flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
        <img src={chatzone} alt="" className="h-[150px]"/>
      </section>
    )
    );
    
   }

  return (
    <section
      onClick={() => {
        setShowCreateRoom(true);
      }}
      className="transition-color-custom hover:bg-white  text-[20px] hover:text-black text-white  flex items-center justify-center h-[50px] w-[50px]  border border-[white] bg-[black] text-white box-border rounded-full cursor-pointer "
    >
      +
    </section>
  );
}


