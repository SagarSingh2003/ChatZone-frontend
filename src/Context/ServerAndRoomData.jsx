import React, { createContext, useEffect, useState, useContext } from "react";

export const ServerAndRoomContext = createContext();

const api = "http://localhost:8080";

export default function ServerAndRoomContextProvider({ children }) {
  const [joinedServers, setJoinedServers] = useState([]);
  const [createdServers, setCreatedServers] = useState([]);
  const [joinedServerRooms, setJoinedServerRooms] = useState([]);
  const [createdServerRooms, setCreatedServerRooms] = useState([]);
  const [refreshServerAndRoomData, setRefreshServerAndRoomData] = useState(0);
  const [allMembersData, setAllMembersData] = useState([]);
  const [ allMessagesData , setAllMessagesData] = useState([]);


  if (
    joinedServers?.length === 0 &&
    localStorage.getItem("joinedServerData") &&
    JSON.parse(localStorage.getItem("joinedServerData")).length !== 0
  ) {
    console.log("*****************");
    setJoinedServers(JSON.parse(localStorage.getItem("joinedServerData")));
    // setJoinedServerRooms(JSON.parse(localStorage.getItem("createdRoomData")));
    // setCreatedServerRooms(JSON.parse(localStorage.getItem("joinedRoomData")));
    // || (joinedServerRooms?.length === 0 && localStorage.getItem('joinedRoomData')?.length !== 0) || (createdServerRooms?.length === 0 && localStorage.getItem('createdRoomData')?.length !== 0)
  }

  if (
    createdServers?.length === 0 &&
    JSON.parse(localStorage.getItem("createdServerData")) &&
    JSON.parse(localStorage.getItem("createdServerData")).length !== 0
  ) {
    setCreatedServers(JSON.parse(localStorage.getItem("createdServerData")));
  }

  if (
    createdServerRooms?.length === 0 &&
    JSON.parse(localStorage.getItem("createdRoomData")) &&
    JSON.parse(localStorage.getItem("createdRoomData")).length !== 0
  ) {
    setCreatedServerRooms(JSON.parse(localStorage.getItem("createdRoomData")));
  }

  if (
    joinedServerRooms?.length === 0 &&
    JSON.parse(localStorage.getItem("joinedRoomData")) &&
    JSON.parse(localStorage.getItem("joinedRoomData")).length !== 0
  ) {
    setJoinedServerRooms(JSON.parse(localStorage.getItem("joinedRoomData")));
  }

  if (
    allMembersData.length === 0 &&
    JSON.parse(
      localStorage.getItem("allMembersData") &&
        JSON.parse(localStorage.getItem("allMembersData").length !== 0),
    )
  ) {
    setAllMembersData(JSON.parse(localStorage.getItem("allMembersData")));
  }

  if(
    allMessagesData.length === 0 &&
    JSON.parse(localStorage.getItem('allMessagesData') && 
    JSON.parse(localStorage.getItem('allMessagesData').length !==  0))
  ){
    setAllMessagesData(JSON.parse(localStorage.getItem('allMessagesData')))
  }

  useEffect(() => {

    fetch("http://localhost:8080/user/getallroomsandservers", {
      mode: "cors",
      method: "GET",
      headers: {
        Authentication: localStorage.getItem("Authentication"),
      },
    }).then(async (res) => {
      console.log("getting server and rooms data");
      const data = await res.json();

      const createdServerRooms = data.createdServerRooms;
      const joinedServerRooms = data.joinedServerRooms;

      const createdServerList = createdServerRooms.map((eachSeverRoomData) => {
        return {
          server_id: eachSeverRoomData.server_id,
          server_name: eachSeverRoomData.server_name,
          user_id: eachSeverRoomData.user_id,
          id: eachSeverRoomData.id,
        };
      });

      const joinedServerList = joinedServerRooms.map((eachJoinedServerData) => {
        return {
          server_id: eachJoinedServerData.server_id,
          member_id: eachJoinedServerData.id,
          server_name: eachJoinedServerData.server.server_name,
          id: eachJoinedServerData.server.id,
        };
      });

      const createdRoomData = createdServerRooms.map((eachSeverRoomData) => {
        return {
          server_id: eachSeverRoomData.server_id,
          room: eachSeverRoomData.room,
        };
      });

      const joinedRoomData = joinedServerRooms.map((eachJoinedServerData) => {
        return {
          server_id: eachJoinedServerData.server_id,
          room: eachJoinedServerData.server.room,
        };
      });


      const joinedServerMessagesData = joinedServerRooms.map((eachJoinedServer) => {
          const messageData = eachJoinedServer.server.room?.map((eachRoom) => {
              return ({
                 room_id : eachRoom.room_id ,
                 messages : eachRoom.messages
              })
          })

          return ({
            message : messageData , 
            server_id : eachJoinedServer.server_id
          })
      })

      const createdServerMessagesData = createdServerRooms.map((eachCreatedServer) => {
          const messageData = eachCreatedServer.room?.map((eachRoom) => {
              return({
                room_id : eachRoom.room_id ,
                messages : eachRoom.messages
              })
          });
        
          return({
            message : messageData,
            server_id : eachCreatedServer.server_id
          })
      })

      console.log(createdServerMessagesData , joinedServerMessagesData , "messages data");


      let tempListOfMembers = [];

      joinedServerRooms.forEach((eachJoinedServerData) =>
        eachJoinedServerData.server.member[0]
          ? tempListOfMembers.push({
              server_id: eachJoinedServerData.server_id,
              member: eachJoinedServerData.server.member,
              creator: eachJoinedServerData.server.user,
            })
          : null,
      );


      createdServerRooms.forEach((eachCreatedServerData) => {
        {
          eachCreatedServerData.member[0]
            ? tempListOfMembers.push({
                server_id: eachCreatedServerData.server_id,
                member: eachCreatedServerData.member,
              })
            : null;
        }
      });

     

      setAllMembersData(tempListOfMembers);

      localStorage.setItem(
        "joinedServerData",
        JSON.stringify(joinedServerList),
      );
      localStorage.setItem(
        "createdServerData",
        JSON.stringify(createdServerList),
      );
      
      localStorage.setItem("createdRoomData", JSON.stringify(createdRoomData));
      localStorage.setItem("joinedRoomData", JSON.stringify(joinedRoomData));
      localStorage.setItem("allMembersData", JSON.stringify(tempListOfMembers));
      localStorage.setItem("allMessagesData" , JSON.stringify(createdServerMessagesData.concat(joinedServerMessagesData)));

      setCreatedServers(createdServerList);
      setJoinedServers(joinedServerList);
      setCreatedServerRooms(createdRoomData);
      setJoinedServerRooms(joinedRoomData);
      setAllMessagesData(createdServerMessagesData.concat(joinedServerMessagesData));

      console.log(allMessagesData , "all messages data");
    });
  }, [refreshServerAndRoomData]);

  return (
    <ServerAndRoomContext.Provider
      value={{
        joinedServers,
        createdServers,
        createdServerRooms,
        joinedServerRooms,
        allMembersData,
        setRefreshServerAndRoomData,
        setCreatedServerRooms,
        allMessagesData
      }}
    >
      {children}
    </ServerAndRoomContext.Provider>
  );
}
