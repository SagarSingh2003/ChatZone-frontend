import { useState, useContext } from "react";
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";
import { AccountDataContext } from "../../Context/AccountData";
import Account from "./Header/Account";
import Logout from "./Header/Logout";
import About from "./Header/About";
import Portfolio from "./Header/Portfolio";


export default function Header() {
  const { accountData } = useContext(AccountDataContext);

  const [accountDetails, setAccountDetails] = useState([]);

  console.log(accountData, "(((((((((((((((((((((((((((");

  if (accountDetails.length === 0 && accountData.length !== 0) {
    console.log("setting account data");
    setAccountDetails(accountData);
    console.log(accountDetails, ": account Data");
  }

  return (
    <section className="flex flex-row w-full justify-between pl-[90px] mt-[20px] pb-[20px] items-center ">
      <section className="flex flex-row w-[50%] justify-between  items-center">
        <Account accountData={accountDetails} />
        
        <h1  className="text-2xl font-bold  flex flex-row items-center text-[30px] pl-[30px]">
          <div id="background-header-chatzone" className="drop-shadow-[0_10px_15px_rgb(10,135,158)] h-full"></div>
          ChatZone
        </h1>
      </section>
      <section className="flex flex-row">
        <Logout />
        <About />
        <Portfolio />
      </section>
    </section>
  );
}
