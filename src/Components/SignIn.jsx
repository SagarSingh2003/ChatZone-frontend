import { useRef } from "react";

const api = "http://localhost:8080";

export default function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <section className="flex flex-col justify-evenly items-center h-1/3 absolute  w-1/3 top-1/3 left-1/3 bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
      <label htmlFor="email" className="text-[white] p-[10px] ">
        Email
      </label>
      <input
        type="text"
        ref={emailRef}
        id="email"
        placeholder="enter your email address"
        className="focus:bg-white focus:text-black bg-inherit text-inherit  p-[10px] placeholder:text-inherit border border-[#E5E7EB] rounded"
        required
      />
      <label htmlFor="password" className=" text-[white] p-[10px] ">
        Password
      </label>
      <input
        type="text"
        id="password"
        ref={passwordRef}
        placeholder="enter your password"
        className="focus:bg-white focus:text-black bg-inherit text-inherit  p-[10px] placeholder:text-inherit border border-[#E5E7EB]  rounded"
        required
      />

      <button
        onClick={() => signInCall(emailRef, passwordRef)}
        className=" border border-[white] bg-[#12151D] mt-[20px] text-[black] rounded pt-[5px] pb-[5px] pl-[20px] pr-[20px]  font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
      >
        SignIn
      </button>
      <p className="mt-[10px] mb-[20px]">
        Don't have an account?{" "}
        <a href="/signup" className="underline">
          SignUp
        </a>
      </p>
    </section>
  );
}

function signInCall(emailRef, passwordRef) {
  fetch(api + "/authenticate/signin", {
    headers: {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    },
    method: "GET",
    mode: "cors",
  }).then(async (res) => {
    if (res.status === 200) {
      const fetchResponse = await res.json();
      localStorage.setItem("Authentication", fetchResponse.jwt);
      window.location = "/";
    } else {
      const fetchResponse = await res.json();
      console.log(fetchResponse.message);
    }
  });
}
