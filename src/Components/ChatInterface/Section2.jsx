import CreateRooms from "./Section2Components/CreateRooms";
import ListOfChannels from "./Section2Components/ListOfChannels";
import SearchMembers from "./Section2Components/SearchMembers";
import { useState, useContext , useEffect} from "react";
import Section3 from "./Section3";
import { AccountDataContext } from "../../Context/AccountData";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";


export default function Section2({ server_id, socket, location }) {
  const { accountData } = useContext(AccountDataContext);
  const [roomsData, setRoomsData] = useState([]);
  const [createRoom, setCreateRoom] = useState({ confirm: false });
  const [refresh , setRefresh] = useState(0);
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [memberData, setMemberData] = useState([]);
  const [serverId , setServerId] = useState();

  const { allMembersData } = useContext(ServerAndRoomContext);

  useEffect(() => {
    console.log('refreshing cause server id changed')
    console.log('server_id : ' , server_id);

    setServerId((id) => server_id);
    setRefresh(c => c + 1);
  }, [server_id])


  useEffect(() => {
    console.log('allMembersData' , allMembersData);
    let memberData  = [] ;
    for (let data of allMembersData) {
      
      if (data.server_id === serverId) {
        console.log("setting member data");
        if (data.creator) {
          memberData = [data.creator, ...data.member];
          console.log(memberData, "setMember data");
        } else {
          console.log(data.member , 'member data settinggg----------');
          memberData = data.member;
        }
        break;
      }

      
    }
    setMemberData(memberData);
  }, [serverId , allMembersData]);

  return (
    <section className="flex flex-row h-[100%] ">
      <section className="border-l border-l-[#272b3f] h-[100%]  w-[20%] overflow-y-auto overflow-x-hidden min-w-[300px] ">
        <section className="flex flex-row w-[100%] justify-center items-center mt-[20px]">
          <section className="w-[80%]">
            <SearchMembers  memberData={memberData} />
          </section>
          <section>
                      
              {location.state?.isadmin ? (
                    <CreateRooms
                      setRoomsData={setRoomsData}
                      setCreateRoom={setCreateRoom}
                      server_id={server_id}
                      createRoom={createRoom}
                    />
                  ) : null}

          </section>          
        </section>
        <section>
          
          <section className="w-full">
            <ListOfChannels
              server_id={server_id}
              currentRoomId={currentRoomId}
              accountData={accountData}
              socket={socket}
              roomsData={roomsData}
              setCurrentRoomId={setCurrentRoomId}
              setRoomsData={setRoomsData}
              createRoom={createRoom}
            />
          </section>
        </section>
        
        <section>
          <section className="font-bold text-white pt-[30px]  underline  flex justify-center items-center underline-offset-[20px] mb-[20px] decoration-[#0A879E]">
            Private Messages
          </section>
        </section>
      </section>
      <section className="border-l border-l-[#272b3f] w-[80%] h-[100%] bg-[#1d202f]">
        <Section3
          currentServerId = {server_id}
          socket={socket}
          accountData={accountData}
          currentRoomId={currentRoomId}
          setRefresh={setRefresh}
        />
      </section>
    </section>
  );
}
