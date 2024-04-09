export default function UserDetails({
  accountDetails,
  createdServers,
  joinedServers,
  setShowUserDetailsComponent,
}) {
  return (
    <section className="flex flex-col   absolute bg-[#12151D]  w-full h-full top-0 left-0  shadow-lg shadow-[#141414] rounded text-[white]">
      <span
        onClick={() => {
          setShowUserDetailsComponent(false);
        }}
        className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px]  text-[#0A879E] box-border  cursor-pointer "
      >
        x
      </span>

      <section className="mt-[100px] ml-[100px] flex flex-row  w-[20%] shadow-[0_0px_15px_rgb(10,135,158)]">
        <section className="flex flex-row items-center ">
          <section className="pl-[40px] pt-[20px] pb-[20px]">
            <span className="mt-[20px] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                <span className="flex items-center justify-center h-[50px] w-[50px] border box-border rounded-full cursor-pointer text-[black] bg-[#E5E7EB]">
                  {accountDetails[0].username.slice(0, 2)}
                </span>
              </span>
            </span>
          </section>
        </section>

        <section className="flex flex-col w-full pt-[20px] pb-[20px]">
          <div className="flex flex-row ">
            <div className="flex flex-col pl-[20px]">
              <div className=" text-[white]   text-sm font-bold pt-[5px] ">
                user Id : {accountDetails[0].user_id}
              </div>
              <div className=" text-[white]   font-bold text-[20px] pt-[5px]">
                username : {accountDetails[0].username}
              </div>
              <div className=" text-[white]   font-bold text[20px] text-sm  pt-[5px] ">
                email : {accountDetails[0].email}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="flex flex-row pb-[10px] w-[50%] pl-[100px] pt-[60px]">
        <section className="flex flex-col w-[50%] ">
          <section className="pb-[20px] ">Joined Servers :</section>
          <section className="flex flex-col pb-10px w-full">
            {joinedServers.map((eachServer) => {
              return <span>{eachServer.server_name}</span>;
            })}
          </section>
        </section>
        <section className="w-[50%] flex flex-col">
          <section className="pb-[20px]">Created Servers :</section>
          <section className="flex flex-col pb-10px w-full">
            {createdServers.map((eachServer) => {
              return (
                <span
                  className="pb-[20px]"
                  title={`server id: ${eachServer.server_id}`}
                >
                  {eachServer.server_name}
                </span>
              );
            })}
          </section>
        </section>
      </section>
      <section className="w-[50%] flex flex-row justify-center mt-[50px]">
        <span className="mt-[20px] p-[10px] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative transition-all p-[10px] ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0 flex items-center justify-center">
            Delete Account
          </span>
        </span>
      </section>
    </section>
  );
}
