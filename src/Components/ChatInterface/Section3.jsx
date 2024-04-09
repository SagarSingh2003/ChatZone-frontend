import { useState, useRef, useEffect, useContext  } from "react";
import {useLocation} from 'react-router-dom';
import { ServerAndRoomContext } from "../../Context/ServerAndRoomData";
import more from "../../assets/more.svg";
import MoreOptions from "./Section3Components/MoreOptions";
import SendBtn from "./Section3Components/SendBtn";
import solovideo from '../../assets/solo-levelling.mp4';
import TypeOfMessage from "./Section3Components/TypeOfMessage";
import RegularOptions from "./Section3Components/RegularOptions";
import AdminOptions from "./Section3Components/AdminOptions";
import adminBadge from '../../assets/admin-badge.svg'



let counter = 0;

const api = "http://localhost:8080"



export default function Section3({ currentServerId , socket, accountData,  currentRoomId , setLocalStorageMessageCount}) {
  counter++;

  const location = useLocation();

  const [messageList , setMessageList] = useState([]);

  const {allMembersData , allMessagesData , setRefreshServerAndRoomData} = useContext(ServerAndRoomContext);

  const [messageListLength , setMessageListLength] =  useState(0);

  const messagesref = useRef();

  const [roomId, setRoomId] = useState(currentRoomId);
  
  const textarearef = useRef();

  const [refresh , setRefresh] = useState(0);

  const [showNoRoom , setShowNoRoom] = useState(true);

  const [showMoreOptions , setShowMoreOptions] = useState({show : false});

  const [currentSessionMessageList, setCurrentSessionMessageList] = useState([]);

  const [showRegularOptions , setShowRegularOptions] = useState({show : false});

  const [showAdminOptions , setShowAdminOptions] = useState({ show : false});

  const [adminData , setAdminData] = useState([]);

  const [creatorData , setCreatorData] = useState();

  console.log('currentServerId' , currentServerId);
  console.log('currentRoomId' , currentRoomId);
  useEffect(() => {
    
    setRefresh(c => c + 1);
    
    setShowNoRoom(true);
  
  } , [currentServerId])

  useEffect(() => {

    setShowNoRoom(false);
    
    listenForMessage(
      socket,
      setCurrentSessionMessageList,
      currentSessionMessageList,
      setMessageList,
      scrollIntoView,
      setLocalStorageMessageCount
    );
  
  }, [currentRoomId]);

  useEffect(() => {
    console.log('allMembersData' , allMembersData);
    let memberData  = [] ;
    let adminData = [];
    
    for (let data of allMembersData) {
      
      if (data.server_id === currentServerId) {
          memberData = data.member;
      }
        break;
    }

    console.log(memberData , "convert into admin data");

    for(let member of memberData) {
      member.isadmin === true ? adminData.push(member.user.username) : null ;
    }
    
    console.log('admin : ' , adminData);
    setAdminData(adminData);

  }, [currentServerId , allMembersData]);

  useEffect(() => {
    setMessageListLength(messageList.length);
  } , [])
  
  // useEffect(() => {
  //   if(messageList.length !== messageListLength){
  //     scrollIntoView();
  //   }
  // } , [messageList]);

  useEffect(() => scrollIntoView() , [roomId , currentRoomId]);

  useEffect(() => {
      console.log('efffectttttttttttttttttttttttttttttttttttttttttttttttinggggggggggggggggggggggggggggggggggggggggggggggggg')
      
      if(allMessagesData.length !== 0){
        console.log('all message daata' , allMessagesData);
        const currentServerMessageData = allMessagesData.filter((eachMessageData) => {
          return (
            eachMessageData.server_id === currentServerId
          )
        })
        setCurrentSessionMessageList((arr) => currentServerMessageData[0].message)
      };
  } , [allMessagesData ,currentServerId]);


  if (
    currentRoomId.length !== 0 &&
    roomId.length === 0 &&
    roomId !== currentRoomId
  ) {
    setRoomId(currentRoomId);
  }

  useEffect(() => {
    //creator data only empty if someone joins from the created servers 
    for(let data of allMembersData){
      if (data.server_id === currentServerId) {
        if (data.creator) {
          setCreatorData(data.creator);
        } 
      }
    }

  } , [currentServerId])

  console.log(creatorData , "creator data....");

  //filtering Messages and scrolling into view
  useEffect(() => {
    console.log('effecting two.............................................................................')
    let tempMessageStorage = [];
    console.log('each message ............. ' , currentSessionMessageList);
    currentSessionMessageList.forEach((eachMessage) => {if(eachMessage.room_id === currentRoomId ){ (tempMessageStorage.push(eachMessage.messages))} });
    if(tempMessageStorage.length !==0){

      if( !messageList[messageList.length - 1] || tempMessageStorage[tempMessageStorage.length - 1].message !== messageList[messageList.length - 1].message){
        setMessageList(...tempMessageStorage);
        
      }
    }

  }, [currentRoomId , currentSessionMessageList , currentServerId]);


  //listen for Notifications : 
  // useEffect(() => {
  //   listenForNotifications(socket , setRefresh);
  // } , [currentServerId])

  //scrollingToView Logic
  function scrollIntoView() {
    document.getElementById("messagesref")?.lastChild?.scrollIntoView({
      behavior : 'smooth',
    });
  }




  // scrolling to the bottom whenever the messageList changes

  // useEffect(() => {
    // scrollIntoView();
  // } , [messageList]);

  console.log('message List : :================' , messageList)
  console.log(accountData[0].username, "account username")

  showMoreOptions.show ? console.log(showMoreOptions, 'show more options') : null;
  console.log(showAdminOptions , 'show more options');
  if (roomId.length !== 0 && !showNoRoom ) {
    return (
      <>
        
        {showMoreOptions.show ? 
                              
                              <MoreOptions x={showMoreOptions.x} y={showMoreOptions.y} setShowMoreOptions={setShowMoreOptions} setRefreshServerAndRoomData={setRefreshServerAndRoomData} messageid={showMoreOptions.messageid}></MoreOptions> : null

        }
        {
          showRegularOptions.show ? <RegularOptions x={showRegularOptions.x} y={showRegularOptions.y} setShowRegularOptions={setShowRegularOptions} setRefreshServerAndRoomData={setRefreshServerAndRoomData}/> : null
        }
        {
          showAdminOptions.show ? <AdminOptions  x={showAdminOptions.x} y={showAdminOptions.y} currentServerId={currentServerId} setShowAdminOptions={setShowAdminOptions} setRefreshServerAndRoomData={setRefreshServerAndRoomData} messageid={showAdminOptions.messageid} messageWrittenByUser={showAdminOptions.messageWrittenByUser} messageWrittenByUserId={showAdminOptions.messageWrittenByUserId} setAdminData={setAdminData} /> : null 
        }

        <section className=" w-[100%] h-[100%] flex flex-col overflow-hidden bg-[black] ">

              {/* //Messages section */}
              
              <section className="messages h-[90%] relative bottom-[0px] w-[100%] mt-auto ">
                      <section
                          ref={messagesref}
                          id="messagesref"
                          className="absolute mt-[200px] flex box-content flex-col h-[100%] pb-[100px] abc  overflow-y-scroll  overflow-x-hidden w-[100%] scroll-green-haha max-[]"
                      >
                              {messageList &&
                      messageList.length !== 0 ? (
                          messageList.sort(function (a , b) {return Number(a.id) - Number(b.id)}).map((eachMessage) => {
                          return eachMessage.user.username === accountData[0].username ? 
                            (
                              <p key={counter++} className=" text-white shrink-0 flex flex-row-reverse items-start justify-start w-full hover:bg-[rgba(96,98,109,0.12)] hover:rounded p-[20px] ml-[0px] ">
                              <section className="flex">
                                  <span  className="flex items-center mr-[20px] justify-center h-[40px] w-[40px] font-bold border border-[#12151D] text-[white] box-border rounded-full cursor-pointer ">{eachMessage.user.username.slice(0,2)}</span>
                              </section>
                              <section className="flex flex-col items-end pr-[20px]">
                                  <section className="flex flex-row-reverse pb-[10px] w-full items-center">
                                      <span className="text-[yellow] text-[15px] pl-[10px] font-bold flex flex-row gap-2 items-center"><span>You</span> | {location.state? (location.state.isadmin? <img src={adminBadge} className="h-[20px]" alt="admin" /> : null )   : (adminData.indexOf(eachMessage.user.username) === -1 ? null : <img src={adminBadge} className="h-[20px]" alt="admin" />)  }</span>    
                                      <span className="pl-[10px] text-[#858B94] text-[13px]">{eachMessage.createdAt}</span>
                                      <section>
                                            {eachMessage.message === "message was deleted by the user" ? null :  
                                          
                                          
                                            <span title="more options" onClick={(e) => {
                                        
                                              setShowMoreOptions((data) => (data.show)? {show : false}  : {show : true , x : e.pageX, y : e.pageY , messageid : eachMessage.id});
                                        
                                        }} className="relative ml-[30px] flex hover:bg-black  items-center justify-center h-[30px] w-[30px] font-bold border border-[#1d202f]   box-border rounded-full cursor-pointer ">
                                          
                                            <img   src={more} alt="more options" className="h-[20px] "/>
                                            
                                            </span>
                                          
                                          
                                          }
                                                      
                                          
                                          
                                      </section>
                                  </section>
                                  {
                                  ((eachMessage.message === "message was deleted by the user") || (eachMessage.message === "message was deleted by the admin")) ? 

                                  <span className="border border-[#12151D] p-[15px] rounded-[7px] hover:bg-[#12151D] italic bg-[white] text-black cursor-pointer w-[100%]">{eachMessage.message}</span> : 
                                  
                                  <span className="border border-[#12151D] p-[15px] rounded-[7px] hover:bg-[#12151D] cursor-pointer w-[90%]">{eachMessage.message}</span>
                                  } 
                              </section>
                              </p>
                          ) 
                          
                          : 

                        (
                            <p key={counter++} className="text-white shrink-0 flex flex-row items-start justify-start w-full hover:bg-[rgba(96,98,109,0.12)] hover:rounded p-[20px] ml-[0px]">
                            <section className="flex">
                                <span  className="flex items-center mr-[20px] justify-center h-[40px] w-[40px] font-bold border border-[#12151D] bg-[#D32529] text-[white] box-border rounded-full cursor-pointer ">{eachMessage.user.username.slice(0,2)}</span>
                            </section>
                            <section className="flex flex-col ">
                                <section className="flex flex-row pb-[10px] items-center">
                                    <span className="text-[#D32629] text-[15px] flex flex-row items-center gap-2 "> <span>{eachMessage.user.username}</span> | {adminData.indexOf(eachMessage.user.username) === -1 ? null :  <img src={adminBadge} className="h-[20px]" alt="admin" /> } {creatorData ? (eachMessage.user.username === creatorData.username ? <img src={adminBadge} className="h-[20px]" alt="admin" /> : null) : null } </span>    
                                    <span className="pl-[10px] text-[#858B94] text-[13px]">{eachMessage.createdAt}</span>
                                    <section>
                                        {
                                        
                                        location.state?.isadmin ? 
                                         <span title="more options" onClick={(e) => {
                                          setShowAdminOptions({show : true , x : e.pageX , y: e.pageY , messageid: eachMessage.id , messageWrittenByUserId: eachMessage.user.id , messageWrittenByUser : eachMessage.user.username})
                                      }} className="relative ml-[30px] flex hover:bg-black  items-center justify-center h-[30px] w-[30px] font-bold border border-[#1d202f]   box-border rounded-full cursor-pointer ">
                                          <img   src={more} alt="more options" className="h-[20px] "/>                                          
                                      </span> 
                                      : 
                                      <span title="more options" onClick={(e) => {
                                        setShowRegularOptions({show : true , x : e.pageX , y : e.pageY})
                                    }} className="relative ml-[30px] flex hover:bg-black  items-center justify-center h-[30px] w-[30px] font-bold border border-[#1d202f]   box-border rounded-full cursor-pointer ">
                                        <img   src={more} alt="more options" className="h-[20px] "/>
                                        
                                    </span>}
                                        
                                    </section>
                                </section>
                                {
                                  ((eachMessage.message === "message was deleted by the user") || (eachMessage.message === "message was deleted by the admin")) ? 

                                  <span className="border border-[#12151D] p-[15px] rounded-[7px] hover:bg-[#12151D] italic bg-[white] text-black cursor-pointer w-[100%]">{eachMessage.message}</span> : 
                                  
                                  <span className="border border-[#12151D] p-[15px] rounded-[7px] hover:bg-[#12151D] cursor-pointer w-[90%]">{eachMessage.message}</span>
                                }  
                                </section>
                            </p>
                        );
                        
                          })
                      ) : (
                      <span className="text-white">{null}</span>
                      )}
                      </section>
              </section>
            
    
            <section className="sendbar relative top-[30px] right-[20px] ">
              
              <section className="sendbarnested flex flex-row bottom-[2%] justify-center fixed w-[80%] bg-transparent">
                <TypeOfMessage scrollIntoView={scrollIntoView} />
                <SendBtn textarearef={textarearef} currentRoomId={currentRoomId} accountData={accountData} socket={socket} setRefreshServerAndRoomData={setRefreshServerAndRoomData} scrollIntoView={scrollIntoView} currentServerId={currentServerId}/>
              </section>
            </section>
          
        </section>
      </>
    );
  } else {
    return (
      <section className="flex justify-center bg-[black] items-center h-[100%] text-white">
        <h1  className="font-bold text-[100px] flex flex-row justify-center items-center">
          <video src={solovideo}  className="rounded " autoPlay loop muted ></video>
        </h1>

      </section>
    );
  }
}



function listenForMessage(
  socket,
  setCurrentSessionMessageList,
  currentSessionMessageList,
  setMessageList,
  scrollIntoView,
  setRefresh
) {

  socket?.removeAllListeners("message");
  socket?.on("message", (data, cb) => {
    cb("message recieved");
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log('message recieved' , data );
    const date = new Date;
   
    setMessageList((list) => {
      return list
        ? [
            ...list,
            {
              
                createdAt : date.toString(),
                message: data.msg,
                user: data.accountData[0]
              
            },
          ]
        : [
            {
              
                createdAt : new Date(),
                msg: data.msg,
                user: data.accountData[0]
              
            },
          ];
    });
    scrollIntoView();
    
  });
}


// function listenForNotifications(socket  , setRefresh){
  
//   socket.removeAllListeners('notification');
  
  
//   socket.on('notification' , (data)  => {
//     console.log("booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooommmmmmmmmmmmmmmmmmmmmmmm " , data)
//     localStorage.setItem(data.room_id , (Number(localStorage.getItem(data.room_id)) - 1))
//     setRefresh(c => c + 1);
//     // setLocalStorageMessageCount({room_id : data.room_id , messageLength : (Number(localStorage.getItem(data.room_id)) - 1 ? Number(localStorage.getItem(data.room_id)) - 1 : 0 )});
//   })
// }