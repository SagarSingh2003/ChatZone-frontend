import React, { useState, createContext, useEffect } from "react";

const api = "http://localhost:8080";

export const AccountDataContext = createContext(null);

export default function AccountDataContextProvider({ children }) {
  const [accountData, setAccountData] = useState([]);
  const [refreshAccountData, setRefreshAccountData] = useState(0);

  if (
    accountData.length === 0 &&
    localStorage.getItem("accountData").length !== 0
  ) {
    setAccountData(JSON.parse(localStorage.getItem("accountData")));
  }

  useEffect(() => {
    fetch(api + "/user/getmyData", {
      method: "GET",
      mode: "cors",
      headers: {
        Authentication: localStorage.getItem("Authentication"),
      },
    }).then(async (res) => {
      const userData = await res.json();

      if(res.status === 200){
        localStorage.setItem(
          "accountData",
          JSON.stringify([
            {
              user_id: userData.user_id,
              username: userData.username,
              email: userData.email,
            },
          ]),
        );
        setAccountData([
          {
            user_id: userData.user_id,
            username: userData.username,
            email: userData.email,
          },
        ]);
      }
      
    });
  }, [refreshAccountData]);

  return (
    <AccountDataContext.Provider value={{ accountData, setRefreshAccountData }}>
      {children}
    </AccountDataContext.Provider>
  );
}
