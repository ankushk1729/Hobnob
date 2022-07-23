import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/router";
import { React, useEffect, useMemo, useRef, useState } from "react";
import { signupUser } from '../utils/signupUser';
import { checkUsernameAvail } from "../utils/userActions";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [isUsernameAvail, setIsUsernameAvail] = useState(true)
  const router = useRouter();

  

  const checkUsername = useMemo(() => {
    return debounce(()=>checkUsernameAvail({username:usernameRef.current.value,setIsUsernameAvail,setUsernameErrorMessage}), 200);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const username = usernameRef.current.value

    if (!username || !email || !password) {
      setErrorMessage("Invalid credentials");
    }
    signupUser({username,email,password,setErrorMessage})
  };
  

  useEffect(() => {
    return () => checkUsername.cancel();
  }, []);
  return (
    <main className=" w-screen min-h-screen flex">
      <section className="bg-gray-50 w-full md:w-1/2 h-full flex justify-center py-10% md:py-8%">
        <article className="w-4/5 lg:w-3/5">
          <header>
            <h1 className="font-bold text-3xl">Sign Up </h1>
            <p className="text-sm text-gray-400 mt-2">Enter your credentials</p>
          </header>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-6">
                <label className="text-[15px]" htmlFor="username">
                  Username
                </label>
                <input
                  className="border h-10 rounded-md text-sm text-[13px] px-2 text-gray-500"
                  type="text"
                  id="username"
                  placeholder="johndoe"
                  ref={usernameRef}
                  onChange={checkUsername}
                ></input>
                {!isUsernameAvail && <p className="text-red-400 text-xs mt-2 ml-2">Username not available</p>}
              </div>
              <div className="flex flex-col mt-6">
                <label className="text-[15px]" htmlFor="email">
                  Email
                </label>
                <input
                  className="border h-10 rounded-md text-sm text-[13px] px-2 text-gray-500"
                  type="email"
                  id="email"
                  placeholder="johndoe@mail.com"
                  ref={emailRef}
                ></input>
              </div>
              <div className="flex flex-col mt-6">
                <label className="text-[15px]" htmlFor="password">
                  Password
                </label>
                <input
                  className="border h-10 rounded-md text-[13px] px-2 text-gray-500"
                  type="password"
                  id="password"
                  ref={passwordRef}
                ></input>
                <div className="flex items-center">
                    {errorMessage && <object
                        className="w-4 h-4 ml-1 mr-2 mt-2"
                        // height="90%"
                        // width="80%"
                        type="image/svg+xml"
                        data="/error-icon.svg"
                    >
                    </object>
                    }
                    <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
                </div>
              </div>

              <button
                type="submit"
                className="text-sm bg-blue text-white w-full py-3 px-6 rounded-md mt-8"
              >
                Sign Up
              </button>
              <p className="text-sm mt-4">
                Already a member?
                <Link href = {`/login`}>
                  <span
                    className="text-blue font-semibold cursor-pointer"
                  >
                    Log In
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </article>
      </section>
      <section className="w-0 md:w-1/2 grid place-items-center bg-gray-100">
        <object
          className="w-90% h-90% lg:w-4/5 lg:h-4/5"
          // height="90%"
          // width="80%"
          type="image/svg+xml"
          data="/illustration2.svg"
        ></object>
      </section>
    </main>
  );
}

export default SignUp;
