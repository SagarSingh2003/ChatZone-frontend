import { useContext, useState } from "react";
import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";

const api = "http://localhost:8080";

export default function JoinServer({
  showJoinServerState,
  setShowJoinServerState,
  setJoinedServerData,
}) {
  const { setRefreshServerAndRoomData } = useContext(ServerAndRoomContext);
  const server_name = showJoinServerState.server_name;
  const server_id = showJoinServerState.server_id;
  const [memberJoinedState, setMemberJoinedState] = useState({});

  function joinServer(server_id) {
    console.log("sending request");
    fetch(api + "/user/joinserver", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("Authentication"),
      },
      body: JSON.stringify({
        server_id: server_id,
      }),
    }).then(async (res) => {
      console.log(res);
      const response = await res.json();
      console.log(response);
      setMemberJoinedState(response);

      if (res.status === 200) {
        setJoinedServerData((data) => [response.memberData, ...data]);
        setRefreshServerAndRoomData((count) => count + 1);
        setTimeout(() => {
          setShowJoinServerState({ confirmation: false });
        }, 3000);
      }
    });
  }
  console.log(' coming hereeee ------------------------------------------')
  return (
    <section className="dooooooooooooomsday flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white] z-[10000]">
      <section>
        <span
          onClick={() => {
            setShowJoinServerState({ confirmation: false });
          }}
          className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px] border border-[white] text-[white] box-border rounded cursor-pointer hover:bg-[white] hover:text-[black]"
        >
          x
        </span>
        <h3 className="font-bold text-[white] p-[10px] text-2xl">
          Do you want to join this server?
        </h3>
      </section>
      <section className="flex flex-col bg-black w-full">
        <div className="flex flex-row pl-[100px]">
          <span className="flex items-center justify-center h-[50px] w-[50px] border box-border rounded-full cursor-pointer text-[black] bg-[#E5E7EB]">
            {server_name.slice(0, 2)}
          </span>
          <div className="flex flex-col pl-[20px]">
            <div className=" text-[white] font-bold  text-l pt-[5px]">
              {server_name}
            </div>
            <div className=" text-[white]   text-sm  pt-[5px] ">
              Server Id : {server_id}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col pb-[10px]">
        <button
          onClick={() => {
            joinServer(server_id);
          }}
          className=" border border-[white] bg-[#12151D] text-[black] rounded pt-[10px] pb-[10px] pl-[20px] pr-[20px]  font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
        >
          Join
        </button>
        {memberJoinedState ? (
          <span className="text-white pt-[10px]">
            {memberJoinedState.message}
          </span>
        ) : null}
      </section>
    </section>
  );
}
