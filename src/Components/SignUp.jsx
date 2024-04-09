import { useRef } from "react";

const api = "http://localhost:8080";

export default function SignUp() {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <section className="flex flex-col justify-evenly items-center h-1/2 absolute  w-1/4 top-[20%] left-[35%] bg-[black] shadow-lg shadow-[#141414] rounded text-[white]">
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
      <label htmlFor="name" className="text-[white] p-[10px] ">
        Username
      </label>
      <input
        type="text"
        id="name"
        ref={nameRef}
        placeholder="enter your name"
        className="focus:bg-white focus:text-black bg-inherit text-inherit  p-[10px] placeholder:text-inherit border border-[#E5E7EB] rounded"
        required
      />
      <label htmlFor="password" className="text-[white] p-[10px] ">
        Password
      </label>
      <input
        type="text"
        id="password"
        ref={passwordRef}
        placeholder="enter your password"
        className="focus:bg-white focus:text-black bg-inherit text-inherit  p-[10px] placeholder:text-inherit border border-[#E5E7EB] rounded"
        required
      />

      <button
        onClick={() => signUpCall(emailRef, nameRef, passwordRef)}
        className=" border border-[white] bg-[white] mt-[20px] text-[black] rounded pt-[5px] pb-[5px] pl-[20px] pr-[20px]  font-bold  hover:bg-[black] hover:text-[white] cursor-pointer"
      >
        SignUp
      </button>
      <p className="mt-[10px] mb-[20px]">
        Already have an account?{" "}
        <a href="/signin" className="underline">
          SignIn
        </a>
      </p>
    </section>
  );
}

function signUpCall(emailRef, nameRef, passwordRef) {
  const data = {
    username: nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
  };
  console.log(JSON.stringify(data));

  fetch(api + "/authenticate/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    body: JSON.stringify(data),
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
