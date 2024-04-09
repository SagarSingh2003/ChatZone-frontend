import leave from "../../../assets/leave.svg";
import { useEffect, useState } from "react";

const api = "http://localhost:8080";

export default function LeaveServer({
  joinedServer,
  setShowFailiureMessage,
  setShowSuccessMessage,
  setJoinedServerData,
  joinedServerData,
}) {
  return (
    <section
      onClick={() => {
        leaveServer(
          joinedServer.member_id,
          setShowFailiureMessage,
          setShowSuccessMessage,
          joinedServer,
          setJoinedServerData,
          joinedServerData,
        );
      }}
      className="flex justify-center items-center h-[30px] w-[30px] border border-[#0A879E] box-border rounded cursor-pointer bg-[#E5E7EB] hover:bg-[white]"
    >
      <img
        src={leave}
        alt="leave server"
        title="leave server"
        className="h-[15px]"
      />
    </section>
  );
}

function leaveServer(
  member_id,
  setShowFailiureMessage,
  setShowSuccessMessage,
  joinedServer,
  setJoinedServerData,
  joinedServerData,
) {
  fetch(api + `/user/leaveserver/${member_id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authentication: localStorage.getItem("Authentication"),
    },
  }).then(async (res) => {
    const response = await res.json();
    if (response.successful === "false") {
      setShowFailiureMessage({ show: true, ...response });
      joinedServerData
        ? setJoinedServerData(joinedServerData)
        : setJoinedServerData([]);
      setTimeout(() => {
        setShowFailiureMessage({ show: false, ...response });
      }, 2000);
    } else {
      setShowSuccessMessage({ show: true, ...response });
      setJoinedServerData((ListOfJoinedServers) => {
        for (let i = 0; i < ListOfJoinedServers.length - 1; i++) {
          if (ListOfJoinedServers[i].server_name === joinedServer.server_name) {
            return ListOfJoinedServers.slice(0, i).concat(
              ListOfJoinedServers.slice(i + 1),
            );
          }
        }
      });
      setTimeout(() => {
        setShowSuccessMessage({ show: false, ...response });
      }, 2000);
    }
  });
}
