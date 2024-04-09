import React, { useState, createContext, useEffect } from "react";
import { render } from "react-dom";

const api = "http://localhost:8080";

export const AllServerDataContext = createContext();

export default function AllServerDataContextProvider({ children }) {
  const [allServerData, setAllServerData] = useState([]);
  const [refreshAllServerState, setRefreshAllServerState] = useState(0);

  if (
    allServerData.length === 0 &&
    JSON.parse(localStorage.getItem("allserverdata")) &&
    JSON.parse(localStorage.getItem("allserverdata")).length !== 0
  ) {
    setAllServerData(JSON.parse(localStorage.getItem("allserverdata")));
  }

  useEffect(() => {
    fetch(api + "/user/getallservers", {
      method: "GET",
      mode: "cors",
      headers: {
        Authentication: localStorage.getItem("Authentication"),
      },
    }).then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("allserverdata", JSON.stringify(data.server_data));

        setAllServerData(data.server_data);
      } else {
        console.log("some error occured in allServerData component");
      }
    });
  }, [refreshAllServerState]);

  return (
    <AllServerDataContext.Provider
      value={{ allServerData, setRefreshAllServerState }}
    >
      {children}
    </AllServerDataContext.Provider>
  );
}
