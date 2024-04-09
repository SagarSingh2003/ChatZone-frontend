import { AccountDataContext } from "../../Context/AccountData";
import { AllServerDataContext } from "../../Context/AllServerData";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";
import { useContext, useState } from "react";

import JoinServer from "./SearchBarComponents/JoinServer";
import { useNavigate } from "react-router-dom";

export default function () {
  const { accountData } = useContext(AccountDataContext);
  const { allServerData } = useContext(AllServerDataContext);
  const { joinedServers, createdServers } = useContext(ServerAndRoomContext);
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState([]);
  const [everyServerData, setAllServerData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [joinedServerData, setJoinedServerData] = useState(joinedServers);
  const [searchResults, setSearchResults] = useState([]);
  const [showJoinServerState, setShowJoinServerState] = useState({
    confirmation: false,
  });

  if (joinedServers.length !== 0 && joinedServerData.length === 0) {
    setJoinedServerData(joinedServers);
  }

  if (joinedServerData)
    if (allServerData.length !== 0 && everyServerData.length === 0) {
      console.log(allServerData);
      setAllServerData(allServerData);
    }

  if (accountData.length !== 0 && accountDetails.length === 0) {
    setAccountDetails(accountData);
  }

  function searchForResults(value) {
    let results = everyServerData
      .filter((serverData) => {
        return serverData.user_id !== accountDetails[0].user_id;
      })
      .filter((serverData) => {
        return (
          serverData.server_id.includes(value) ||
          serverData.server_name.includes(value)
        );
      });
    console.log("resultssssss:::::::::::::", results);
    for (let oneResult of results) {
      for (let oneJoinedServer of joinedServers) {
        if (oneResult.server_id === oneJoinedServer.server_id) {
          const index = results.indexOf(oneResult);
          results = results
            .slice(0, index)
            .concat(results.slice(index + 1, results.length));
        }
      }
    }

    if (results.length === 0) {
      if (searchResults.length !== 0) {
        setSearchResults([]);
      }
    } else {
      setSearchResults(results);
    }
  }

  if (showJoinServerState.confirmation === true) {
    return (
      <JoinServer
        showJoinServerState={showJoinServerState}
        setShowJoinServerState={setShowJoinServerState}
        setJoinedServerData={setJoinedServerData}
      ></JoinServer>
    );
  }

  function showJoinWindow(eachitem){
      console.log('hello worlddd');
      setShowJoinServerState({confirmation : true , ...eachitem});
  }

  return (
    <section className="flex flex-col w-full pl-[20px]">
      <input
        type="text"
        placeholder="search for servers worldwide...."
        onChange={(e) => {
          searchForResults(e.target.value);
        }}
        onBlur={() => {
          setTimeout(() => {
            showJoinServerState.confirmation === false
              ? setShowResults(false)
              : null;
          }, 1000);
        }}
        onFocus={() => {
          setShowResults(true), searchForResults("");
        }}
        className="p-[10px] w-[80%] rounded bg-[#12151D] hover:border hover:border-[#0A879E] hover:shadow-[0_30px_50px_rgba(56,185,199,0.15)] focus:border-[#0A879E] placeholder:font-bold "
      />
      {showResults ? (
        <section className="flex flex-col  w-[80%]  mt-[10px]  box-border ">
          {searchResults.length !== 0 ?
            
             searchResults.map((eachItem) => 
            
            <p
             onClick={() => {
              console.log('setting..')
              setShowJoinServerState({confirmation: true, ...eachItem })
             }}
            // onClick={showJoinWindow.bind(this, eachItem)}
            className="cursor-pointer pt-[8px] pb-[8px] pl-[15px] bg-[#0E1017] mb-[4px] rounded text-white  box-border   flex flex-row items-center hover:text-[#0A879E] hover:font-bold"
            key={eachItem.server_id}
            >
              {eachItem.server_name}
          </p>  
                
              ) : null }
        </section>
      ) : null}
    </section>
  );


}
