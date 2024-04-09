import { useState } from "react";

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  if (loggedOut) {
    window.location = "/signin";
  }
  return (
    <section
      onClick={() => {
        localStorage.removeItem("Authentication");
        setLoggedOut(true);
      }}
      className=" border mr-[40px] border-[#0A879E] bg-[#12151D]  text-[white] rounded pt-[10px] pb-[10px] pl-[20px] pr-[20px]  font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
    >
      Logout
    </section>
  );
}
