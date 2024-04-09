import { useRef, useState } from "react";

const api = "http://localhost:8080";

export default function ServerWindow({ setShowCreateServerWindow }) {
  const [serverCreationState, setServerCreationState] = useState({});
  const serverNameRef = useRef(null);
  const temporaryRandomId = 1000 * Math.random() + 10000 * Math.random();

  function createServer(server_name) {
    fetch(api + "/user/createServer", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("Authentication"),
      },
      body: JSON.stringify({
        server_name: server_name,
      }),
    }).then(async (res) => {
      const servercreated = await res.json();
      const message = servercreated.message;

      if (res.status === 200) {
        setServerCreationState({ successful: "true", message: message });
        setServerData((data) => [
          ...data,
          {
            server_name: servercreated.server_name,
            server_id: temporaryRandomId,
          },
        ]);

        setTimeout(() => {
          setServerCreationState({});
        }, 5000);
      } else {
        console.log(message);
        setServerCreationState({ successful: "false", message: message });
        setTimeout(() => {
          setServerCreationState({});
        }, 5000);
      }
    });
  }

  return (
    <section className="flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
      <section>
        <span
          onClick={() => {
            setShowCreateServerWindow(false);
          }}
          className="absolute right-[30px] top-[20px] flex items-center justify-center h-[40px] w-[40px] border border-[white] text-[white] box-border rounded cursor-pointer hover:bg-[white] hover:text-[black]"
        >
          x
        </span>
        <label
          htmlFor="createServer"
          className="font-bold text-[white] p-[10px] text-2xl rounded"
        >
          Enter a server Name
        </label>
      </section>
      <section className="flex flex-row justify-evenly w-full">
        <input
          type="text"
          ref={serverNameRef}
          id="createServer"
          className="bg-inherit text-inherit placeholder:font-bold pl-[20px] placeholder:text-inherit"
          placeholder="Enter a server name"
        />
        <button
          onClick={() => {
            createServer(serverNameRef.current.value);
          }}
          className=" border border-[white] bg-[white] text-[black] rounded p-[10px] font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
        >
          Create
        </button>
      </section>
      <section>
        {serverCreationState.successful ? (
          <span className="text-white">{serverCreationState.message}</span>
        ) : null}
      </section>
    </section>
  );
}
