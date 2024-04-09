import { useContext, useState } from "react";
import { AccountDataContext } from "../../../Context/AccountData";
import chatzone from '../../chatzone.gif';

export default function AccountDetails() {
  const { accountData } = useContext(AccountDataContext);

  console.log("account Data", accountData);

  const [accountDetails, setAccountDetails] = useState(accountData);

  if (accountData.length === 0) {
    setAccountDetails([]);
  }

  return (
    <section
      className="flex items-center justify-center h-[50px] w-[50px] font-bold border border-[#0A879E] bg-[#12171D] text-white box-border rounded-full cursor-pointer  "
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
