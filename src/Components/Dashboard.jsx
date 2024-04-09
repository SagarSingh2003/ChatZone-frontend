import Header from "./Dashboard/Header";
import SearchBar from "./Dashboard/SearchBar";
import CreateServer from "./Dashboard/CreateServer";
import JoinedServer from "./Dashboard/JoinedServer";
import OwnServer from "./Dashboard/OwnServer";

import {useState} from 'react';

export default function Dashboard() {


  const [showWhichServer , setShowWhichServer] = useState('created');

  const isCreatedServerTabActive = showWhichServer === 'created' ? true : false;
  
  const isJoinedServerTabActive = showWhichServer === 'joined'? true : false;

  if (!localStorage.getItem("Authentication")) {
    window.location = "/signin";
  }
  return (
    <section className="text-[white] ">
      <Header></Header>
      <section className="flex flex-row w-[100%] h-[870px]">
              <section className="flex flex-col w-[50%] pt-[30px]">

                    <section  className="flex flex-row mt-[30px] ml-[100px] w-[100%]">

                    <CreateServer></CreateServer>
                    <SearchBar></SearchBar>
                    </section>

                    <section  id="background-gri" className="flex flex-col w-[100%] mt-[70px] pt-[20px]">
                        <section className="flex flex-row pl-[120px] ">
                            <section  onClick={() => (setShowWhichServer((server) => 'created'))} className="border  border-[#0A879E] bg-[#12151D]  border-r-0 text-[white]   flex items-center justify-center font-bold  hover:bg-[black] hover:text-[white] cursor-pointer" >
                              {showWhichServer === 'created' ? <span className="bg-black pt-[10px] pb-[10px] pl-[20px] pr-[20px]">Created Servers</span> : <span className="text-[#938F8C] pt-[10px] pb-[10px] pl-[20px] pr-[20px]">Created Servers</span>} 
                            </section>
                            <section onClick={() => (setShowWhichServer((server) => 'joined'))} className="border  border-[#0A879E] bg-[#12151D] border-l border-l-0 text-[white]  flex items-center justify-center font-bold  hover:bg-[black] hover:text-[white] cursor-pointer">
                              {showWhichServer === 'joined' ? <span className="pt-[10px] pb-[10px] pl-[20px] pr-[20px] bg-black">Joined Servers</span> : <span className="text-[#938F8C] pt-[10px] pb-[10px] pl-[20px] pr-[20px] ">Joined Servers</span>} 
                            </section>
                        </section>
                        {showWhichServer === 'created' ? <OwnServer></OwnServer> : <JoinedServer></JoinedServer>}
                      </section>
              </section>

                <section id="background-grid" className="w-[50%] flex justify-center items-center bg-[#10121a] h-full overflow-clip">
                  <h1 id="background-img-chatzone" className="font-bold text-[40px] text-[#0A879E] drop-shadow-[0_10px_15px_rgb(10,135,158)]">
                    {/* ChatZone */}
                  </h1>
                </section>

      </section>

      <section className="h-[400px] flex items-center justify-center ">
          Footer
      </section> 
      {/* <section className="h-[400px] flex flex-col border-t border-t-[#10121A]">
          <section className="font-bold text-[20px] text-[black] decoration-[1px] underline underline-offset-[10px] ml-auto mr-auto mt-[30px]">
            Recent Projects 
          </section>
          <section className="w-full flex flex-row justify-evenly items-center h-full mt-[30px]">
            <section className="w-[25%] h-full border border-black bg-[white]">

            </section>
            <section className="w-[25%] h-full border border-black bg-[white]">

            </section>
            <section className="w-[25%] h-full border border-black bg-[white]">

            </section>
          </section>
          <section className="mt-20px">

          </section>
      </section> */}

      </section>
  );
}
