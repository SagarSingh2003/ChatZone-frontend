import { useContext, useState } from "react";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";
import EditServer from "./OwnServerComponent/EditServer";
import DeleteServer from "./OwnServerComponent/DeleteServer";
import { useNavigate } from "react-router-dom";
import chatzone from '../chatzone.gif'

export default function OwnServer() {
  const { createdServers } = useContext(ServerAndRoomContext);
  const navigate = useNavigate();
  const [createdServerData, setCreatedServerData] = useState([]);

  if (createdServers.length !== 0 && createdServerData.length === 0) {
    setCreatedServerData([...createdServers]);
  }

  if (
    createdServerData.length != 0 &&
    createdServers.length !== createdServerData.length
  ) {
    setCreatedServerData([...createdServers]);
  } else {
    // if(createdServerData.length !== 0 ){
    //     for(let eachserver of createdServers){
    //         for(let server of createdServerData){
    //             if()
    //         }
    //     }
    // }
  }

  if (createdServerData.length !== 0 && createdServers.length !== 0) {
    console.log(createdServerData, "joinedServerData");

    for (let createdServer of createdServerData) {
      let check = false;
      console.log(createdServer);
      for (let server of createdServers) {
        if (server.server_name === createdServer.server_name) {
          check = true;
        }
      }

      if ((check = true)) {
        check = false;
        continue;
      } else {
        setCreatedServerData(createdServers);
      }
    }
  }

  return (
    <section  className=" pl-[100px] mt-[20px] w-full">
      
      <section className="flex flex-col items-center">
        <ul className="w-full">
          {createdServerData.length === 0
            ? <img src={chatzone} alt="loading..." className="h-[200px]"></img>
            : createdServerData.map((createdServer) => (
                <li
                  onClick={() => {
                    navigate(`/chatzone/${createdServer.server_id}`, {
                      state: { isadmin: true },
                    });
                  }}
                  className="pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] text-[white]   hover:bg-[#0e1017] "
                  key={createdServer.id}
                >
                  <section className="flex flex-row w-full justify-between">
                    <section>{createdServer.server_name}</section>
                    <section>
                      <section className="flex flex-row w-[90px] justify-between pr-[20px]">
                        {<EditServer />}
                        {<DeleteServer />}
                      </section>
                    </section>
                  </section>
                </li>
              ))}
        </ul>
      </section>
    </section>
  );
}
