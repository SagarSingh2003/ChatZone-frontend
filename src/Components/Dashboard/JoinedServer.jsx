import { useContext, useState } from "react";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";
import LeaveServer from "./JoinedServerComponent/LeaveServer";
import { useNavigate } from "react-router-dom";

export default function JoinedServer() {
  const navigate = useNavigate();
  console.log("refreshing joined server page");
  const { joinedServers, setRefreshServerAndRoomData } =
    useContext(ServerAndRoomContext);

  const [joinedServerData, setJoinedServerData] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState({ show: false });
  const [showFailiureMessage, setShowFailiureMessage] = useState({
    show: false,
  });

  if (joinedServers.length !== 0 && joinedServerData.length === 0) {
    console.log(joinedServerData.length, "setting joinedServer data");
    console.log(joinedServers);
    setJoinedServerData([...joinedServers]);
  }

  if (joinedServerData.length !== 0 && joinedServers.length !== 0) {
    if (joinedServerData.length !== joinedServers.length) {
      setJoinedServerData([...joinedServers]);
    } else {
      console.log(joinedServerData, "joinedServerData");
      console.log(joinedServers, "joinedServers");
      // joinedServerData.forEach((joinedServer) => {
      //         joinedServers.forEach((server) => {
      //             server.server_name === joinedServer.server_name ? null : setJoinedServerData(joinedServers);
      //         })
      // })

      for (let joinedServer of joinedServerData) {
        let check = false;
        console.log(joinedServer, "joined servers ");
        for (let server of joinedServers) {
          console.log(server.server_name, "server.server_name");
          console.log(joinedServer.server_name, "joined server server name");
          if (server.server_name === joinedServer.server_name) {
            console.log(server.server_name, "server.server_name");
            console.log(joinedServer.server_name, "joined server server name");
            check = true;
          }
        }

        if (check === true) {
          console.log(check);
          check = false;
          console.log(check);
        } else {
          console.log("setting joinedServers", joinedServers);
          setJoinedServerData([...joinedServers]);
        }
      }
    }
  }

  if (showSuccessMessage.show === true) {
    console.log("refreshing the page.....");

    setRefreshServerAndRoomData((count) => {
      count + 1;
    });
  }

  return (
    <section  className="  pl-[100px] mt-[20px] w-full">
      
      <section className="flex flex-col items-center">
        {showFailiureMessage.show === true ? (
          <section className="fixed top-[30px]">
            <div
              id="alert-2"
              className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                {showFailiureMessage.message}
              </div>
            </div>
          </section>
        ) : showSuccessMessage.show === true ? (
          <section className="fixed top-[30px] ">
            <div
              id="alert-3"
              className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                {showSuccessMessage.message}
              </div>
            </div>
          </section>
        ) : null}
        <ul className="w-full">
          {joinedServerData.length === 0 ? (
            <li className="pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] hover:shadow-[0_0px_20px_rgba(10,135,158,0.25)] ">
              No servers present ...
            </li>
          ) : (
            joinedServerData.map((joinedServer) => (
              <li
                onClick={() => {
                  navigate(`/chatzone/${joinedServer.server_id}`);
                }}
                className="pt-[10px] pb-[10px] mt-[10px] mb-[10px] rounded cursor-pointer w-[90%] pl-[20px] text-[white]   hover:bg-[#0e1017]"
                key={joinedServer.id}
              >
                <section className="flex flex-row w-full justify-between">
                  <section>{joinedServer.server_name}</section>
                  <section className="pr-[30px]">
                    <LeaveServer
                      joinedServer={joinedServer}
                      setJoinedServerData={setJoinedServerData}
                      setShowFailiureMessage={setShowFailiureMessage}
                      setShowSuccessMessage={setShowSuccessMessage}
                      joinedServerData={joinedServerData}
                    />
                  </section>
                </section>
              </li>
            ))
          )}
        </ul>
      </section>
    </section>
  );
}
