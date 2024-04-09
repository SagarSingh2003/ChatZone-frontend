// import MessagesList from "./MessagesComponents/MessagesList"


// export default function Messages({counter , messageList  , messagesref}){
//     return(
//         <>            
//          </>
//     )
// }

// // {messageList &&
// //     messageList.length !== 0 ? (
// //         messageList.map((eachMessage) => {
// //         return (
// //             <p key={counter++} className="text-white shrink-0 flex flex-row items-start justify-start w-full hover:bg-[rgba(96,98,109,0.12)] hover:rounded p-[20px] ml-[0px]">
// //             <section className="flex">
// //                 <span  className="flex items-center mr-[20px] justify-center h-[40px] w-[40px] font-bold border border-[#12151D] bg-[#12151D] text-[white] box-border rounded-full cursor-pointer ">{eachMessage.user.username.slice(0,2)}</span>
// //             </section>
// //             <section className="flex flex-col ">
// //                 <section className="flex flex-row pb-[10px]">
// //                     <span className="text-[#752349] text-[15px]">{eachMessage.user.username}  {location.state? (location.state.isadmin? "| Admin" : null) : null }</span>    
// //                     <span className="pl-[10px] text-[#858B94] text-[13px]">{eachMessage.createdAt}</span>
// //                     <section>
// //                         <span title="more options" onClick={(e) => {
// //                             console.log(e.pageY , "y-a")
// //                             console.log(showMoreOptions.y , "y-b");
// //                             console.log(e.pageY);
// //                             console.log(showMoreOptions.y);
// //                             setShowMoreOptions((data) => (data.show)? {show : false}  : {show : true , x : e.pageX  , y : e.pageY});
// //                         }} className="relative ml-[30px] flex hover:bg-black  items-center justify-center h-[30px] w-[30px] font-bold border border-[#1d202f]   box-border rounded-full cursor-pointer ">
// //                             <img   src={more} alt="more options" className="h-[20px] "/>
                            
// //                         </span>
                        
// //                     </section>
// //                 </section>
// //                 <span className="">{eachMessage.message}</span> 
// //             </section>
// //             </p>
// //         );
// //         })
// //     ) : (
// //     <span className="text-white">{null}</span>
// //     )}