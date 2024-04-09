import { useContext, useState } from "react";
import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";
import UserDetails from "./AccountComponents/UserDetails";
import chatzone from '../../chatzone.gif';

export default function Account({ accountData }) {
  const [accountDetails, setAccountDetails] = useState([]);
  const { createdServers, joinedServers } = useContext(ServerAndRoomContext);
  const [showUserDetailsComponent, setShowUserDetailsComponent] =
    useState(false);
  console.log(accountData);

  if (accountData.length !== 0 && accountDetails.length === 0) {
    //checking if the object is not empty

    console.log("account data", accountData);
    setAccountDetails(accountData);
  }

  if (accountDetails.length !== 0) {
    if (
      accountDetails[0].user_id !== accountData[0].user_id ||
      accountDetails[0].username !== accountData[0].username ||
      accountDetails[0].email !== accountData[0].email
    ) {
      setAccountDetails(accountData);
    }
  }

  if (showUserDetailsComponent === true) {
    return (
      <UserDetails
        accountDetails={accountDetails}
        createdServers={createdServers}
        joinedServers={joinedServers}
        setShowUserDetailsComponent={setShowUserDetailsComponent}
      />
    );
  }

  return (
    <section
      className="flex items-center justify-center h-[50px] w-[50px] font-bold border border-[#0A879E] bg-[#12171D] text-white box-border rounded-full cursor-pointer  "
      onClick={() => {
        setShowUserDetailsComponent(true);
      }}
      title={
        accountDetails.length !== 0 ? accountDetails[0].username : "loading.."
      }
    >
      {accountDetails.length === 0 || accountDetails[0].username == undefined
        ? <img src={chatzone} alt="loading.." className="h-[50px]"></img>
        : accountDetails[0]?.username.slice(0, 2)}
    </section>
  );
}
