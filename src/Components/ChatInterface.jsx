import { useLocation, useParams } from "react-router-dom";
import Section1 from "./ChatInterface/Section1";
import Section2 from "./ChatInterface/Section2";
import Header from "./ChatInterface/Header/Header";
import Section3 from "./ChatInterface/Section3";
import { io } from "socket.io-client";
import { useContext , useEffect , useState} from "react";
import { ServerAndRoomContext } from "../Context/ServerAndRoomData";

const socket = io("http://localhost:8080");
  
export default function ChatInterface() {

  const [refreshChatPage , setRefreshChatPage] = useState(0);
  const { server_id } = useParams();
  const location = useLocation();

  console.log(location, "location");
  
  

  useEffect(() => {
    
    socket.removeAllListeners('')
  } , [server_id])

  

  // Implemented this for notifications : 
  // useEffect(() => {
  //   socket.emit("join-server" , ({server_id : server_id}))

  //   return () => {
  //     socket.emit('leave-server');
  //   }
  // } , [server_id])

  

  return (
    <section className="flex flex-col h-screen  overflow-x-hidden bg-black ">
      <Header />
      <section className=" height-media h-[93.9%] flex flex-row overscroll-y-contain ">
      {/* old : bg-[rgba(119,121,130,0.12)] */}
        <section className="w-[4%] min-w-[70px] bg-black ">
          <Section1 server_id={server_id} setRefreshChatPage={setRefreshChatPage}/>
        </section>
        <section className="w-[95%] bg-[black]">
          <Section2 server_id={server_id} location={location} socket={socket} />
        </section>
      </section>
    </section>
  );
}
