import { useContext, useEffect, useState } from "react";
import { ServerAndRoomContext } from "../../../Context/ServerAndRoomData";


export default function SearchMembers({ memberData}) {

  const [searchForValue, setSearchForValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);





  console.log('searchForValue' , searchForValue);
  console.log(memberData , 'member data');

  if (
    searchForValue &&
    searchForValue.length !== 0 &&
    memberData.length !== 0
  ) {
    console.log(searchForValue);

    const result = memberData.filter((eachData) => {
      return (
        eachData.user?.username.includes(searchForValue) ||
        eachData.user?.email.includes(searchForValue) ||
        eachData.username?.includes(
          searchForValue || eachData.email?.includes(searchForValue),
        )
      );
    });
    console.log(result, "reulttttttttttttttttttttttttttttttttttttttt");
    setSearchResults(result);
    setSearchForValue(null);
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="search members...."
        onChange={(e) => {
          console.log('on change , ' , e.target.value)
          setSearchForValue(e.target.value);
        }}
        onBlur={() => {
          setTimeout(() => {
            setSearchForValue(null), setSearchResults([]);
          }, 100);
        }}
        onFocus={() => {
          setSearchForValue(" ");
        }}
        className="p-[10px] ml-[2px] pl-[10px] box-border w-[90%] rounded bg-[black] placeholder:text-white text-white hover:border hover:border-[#0A879E] hover:shadow-[0_30px_50px_rgba(56,185,199,0.15)] focus:border-[#0A879E] placeholder:font-bold text-white placeholder:text-center"
      />

      {searchResults  && searchResults.length !== 0 ? (
        <ul className="searchresult flex flex-col absolute w-[20%]  mt-[10px]  box-border top-[125px] left-[100px] transition-width-custom">
          {
            searchResults.map((eachItem) => (
                <li
                  onClick={() => {}}
                  className="mt-[10px] pt-[8px] pb-[8px] pl-[15px] bg-[#50FA78] mb-[4px] rounded text-black  box-border  hover:shadow-[0_0px_20px_rgba(10,135,158,0.25)] hover:h-[50px] hover:w-[101%] flex flex-row items-center hover:text-[#0A879E] hover:font-bold"
                  key={eachItem.server_id}
                >
                  {eachItem.user ? eachItem.user.username : eachItem.username}
                </li>
              ))}
        </ul>
      ) : null}
    </section>
  );
}
