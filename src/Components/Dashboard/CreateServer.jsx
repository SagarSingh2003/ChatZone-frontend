import ServerWindow from "./CreateServerComponent/CreateServerWindow";
import { useState } from "react";

export default function CreateServer() {
  const [showCreateServerWindow, setShowCreateServerWindow] = useState(false);

  return (
    <section>
      <section
        onClick={() => {
          setShowCreateServerWindow((value) => (value ? false : true));
        }}
        className="flex items-center justify-center h-[50px] w-[50px] border border-[#0A879E] box-border rounded-full cursor-pointer bg-[#12171D] text-[20px] text-white hover:shadow-[0_0px_125px_rgb(10,135,158)]"
        title="create servers"
      >
        +
      </section>
      <section>
        {showCreateServerWindow ? (
          <ServerWindow setShowCreateServerWindow={setShowCreateServerWindow} />
        ) : null}
      </section>
    </section>
  );
}
