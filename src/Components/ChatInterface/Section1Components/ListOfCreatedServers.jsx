import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";
import { useContext } from "react";
import { useNavigate  } from "react-router-dom";

export default function ListOfCreatedServers({ server_id , setRefreshChatPage}) {
  const { createdServers } = useContext(ServerAndRoomContext);

  const navigate = useNavigate();
  return createdServers.map((eachServer) => {
    return (
      <>
      { server_id === eachServer.server_id ? 

        <section className="flex flex-row items-center w-[50px]">
          <span className=" hover:bg-[black] hover:text-white flex flex-row items-center justify-center  mt-[5px] mb-[5px] ml-[5px] rounded-[10px] cursor-pointer p-[12px]  border border-[#1d202f] hover:border-r-white bg-[white] text-black">
            {eachServer.server_name.slice(0, 2)}
          </span>
        </section>
        :
        <section className="flex flex-row items-center w-[50px]">
          <span onClick={() => {
                    navigate(`/chatzone/` + eachServer.server_id , {
                      state: { isadmin: true },
                    });
                    // navigate(0);
                    
                  }}
                className=" hover:bg-[#1d202f] flex flex-row items-center justify-center  mt-[5px] mb-[5px] ml-[5px] rounded-[10px] cursor-pointer p-[12px]  border border-[#1d202f] hover:border-r-white bg-[black] text-white">
            {eachServer.server_name.slice(0, 2)}
          </span>
        </section>

      
      }</>);
  });
}
