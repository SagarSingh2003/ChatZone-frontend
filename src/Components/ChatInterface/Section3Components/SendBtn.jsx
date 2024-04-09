import sendbtn from "../../../assets/sendbtn.svg";
import Emojis from "./Emojis";
import { useState , useEffect } from "react";
const api = "http://localhost:8080";


export default function SendBtn({scrollIntoView , setRefreshServerAndRoomData , socket , accountData , currentRoomId , textarearef ,currentServerId}){
  
    const [usersTyping , setUsersTyping] = useState([]);  
  
  useEffect(() => {
    socket.removeAllListeners('typing-start');
    socket.on('typing-start' , (data ) => {
       setUsersTyping((arr) => [...arr , data.accountData[0].username])
       console.log(usersTyping);
    })
  } , []);

  useEffect(() => {
    socket.removeAllListeners('typing-stop');
    socket.on('typing-stop' , (data) => {
      setUsersTyping((arr) => arr.slice(0 , arr.indexOf(data.accountData[0].username)).concat(arr.slice(arr.indexOf(data.accountData[0].username) + 1 , )));
      console.log(usersTyping);
    })
  })

  if(usersTyping.length !== 0){
    console.log(usersTyping);
    textarearef.current.placeholder = `${usersTyping.reduce((prev ,curr) => curr + " " +  prev , "")} is typing... `
  }else if(usersTyping.length === 0 && textarearef.current ){
    textarearef.current.placeholder = ""
  }

  return (
          <>
              <textarea
                     
                      ref={textarearef}
                      name="message-box"
                      id="text"
                      cols="90"
                      rows="1"
                      className=" pl-[20px] rounded flex flex-row items-center pt-[10px] pb-[10px]"

                      onFocus={(e) => {
                        scrollIntoView(e);
                        console.log('started typing...');
                        socket.emit('typingStart' , currentRoomId , accountData);                           
                      }}

                      onBlur={(e) => {
                        console.log('stopped typing');
                        socket.emit('typingStop' ,  currentRoomId , accountData);
                      }}

                      onKeyDown={(e) => {
                          if(e.key === "Enter" && String(textarearef.current.value).trim() !== ""){
                            
                            sendMessage(
                              textarearef.current.value,
                              currentRoomId,
                              accountData,
                              socket,
                              setRefreshServerAndRoomData,
                              scrollIntoView,
                              currentServerId
                            );
                            textarearef.current.value = "";
                          }
                      }}
                > 

              </textarea>
              <Emojis textarearef={textarearef} />
              <section
                      onClick={() => {
                        console.log("sending .............");
                        
                        sendMessage(
                          textarearef.current.value,
                          currentRoomId,
                          accountData,
                          socket,
                          setRefreshServerAndRoomData,
                          scrollIntoView,
                          currentServerId
                        );
                        textarearef.current.value = "";
                      }}

                      className=" ml-[20px] flex items-center  justify-center  font-bold  border border-white bg-[black] text-white box-border rounded-full cursor-pointer pl-[14px] pr-[14px] pt-[12px] pb-[12px]"
                      >
                      <img src={sendbtn} alt="" className="h-[20px]" />
              </section>
          </>
    )
}


function sendMessage(value, room_id, account_data, socket , setRefreshServerAndRoomData , scrollIntoView , currentServerId) {
    console.log("sending message ", value);
    
    
    console.log('this is the current server id : ' , currentServerId)   
  
    socket.emit("sendmessage", room_id, account_data, value);
    // socket.emit('notification' , {server_id : currentServerId , room_id: room_id}); 
  
    fetch(api + "/messages/save-message" , {
      mode : "cors",
      method : "POST", 
      headers : {
          "Content-Type" : "application/json",
          Authentication : localStorage.getItem("Authentication")
      }, 
      body : JSON.stringify({
         message : value , 
         room_id : room_id,
         ofType : 'text-emoji',
  
      })
  
    }).then(async (res) => {
      const response = await res.json();
      
      // const currentCountOfMessages = Number(localStorage.getItem(room_id));
      // console.log('setting room_id ::' , room_id , currentCountOfMessages);
      // localStorage.setItem(room_id , currentCountOfMessages + 2);
      setTimeout(() => {
        setRefreshServerAndRoomData((count) => count + 1);
      } , 5000);
    })
  
}
  