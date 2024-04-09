import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatzone from '../../chatzone.gif';

export default function Header() {
  const tempStyle = window.navigator.onLine ? "#3ABB4C" :  "#F23F42" ;
  const [onlineState, setOnlineState] = useState({isOnline : window.navigator.onLine , style : tempStyle});
  const navigate = useNavigate();

  window.addEventListener('online' , () => {
    console.log('goingg onlineeeeeeeeeeeeeeeee..................................');
    setOnlineState((data) => { return {isOnline : true  , style : "#3ABB4C"}});
  })

  window.addEventListener('offline' , () => {
    console.log('going offline.............................');
    setOnlineState((data) => {return {isOnline : false , style : "#F23F42"}});
  })
    
  return (
    <section className="flex flex-row justify-between items-center w-[100%] pr-[30px]  h-[60px] border-b border-b-[#272b3f]">
      <h1
        className="text-2xl font-bold  h-[60px] flex flex-row justify-center w-[80%] ml-[45%] drop-shadow-[0_10px_15px_rgb(10,135,158)] pl-[10px] text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        <section className="flex flex-row items-center w-full cursor-pointer">

          <img src={chatzone} alt=" " className="h-[50px]"/>
          ChatZone
        </section>
      </h1>
      <span className="text-white pl-[10px] pr-[10px] w-[5%] text-center rounded" style={{color : "white" , background : onlineState.style}}>{onlineState.isOnline ? "Online" : "Offline"}</span>
    </section>
  );
}
