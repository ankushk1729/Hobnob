import { React, useState, useEffect,useRef } from "react";
import {useRouter} from 'next/router'
import {loginUser} from '../utils/loginUser'
function Login() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const router = useRouter()
    const [errorMessage,setErrorMessage] = useState('')
    const pushToSignUp = () => {
        router.push('/signup')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(!email || !password) {
            setErrorMessage("Invalid email or password")
            return
        }
        loginUser(email,password,setErrorMessage)

    }
    return (
        <main className=" w-screen h-screen flex">
        <section className="w-full md:w-1/2 h-full flex justify-center py-15% md:py-8%">
            <article className="w-4/5 lg:w-3/5">
            <header>
                <h1 className="font-bold text-3xl">Log In </h1>
                <p className="text-sm text-gray-400 mt-2">
                Enter your credentials to access your account
                </p>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-6">
                <label className="text-[15px] mb-1 " htmlFor="email">
                    Email
                </label>
                <input
                    className="border h-10 rounded-md text-[13px] px-2 text-gray-500"
                    type="email"
                    id="email"
                    placeholder="johndoe@mail.com"
                    ref={emailRef}

                ></input>
                </div>
                <div className="flex flex-col mt-6">
                <label className="text-[15px] mb-1" htmlFor="password">Password</label>
                <input
                    className="border h-10 rounded-md text-[13px] px-2 text-gray-500"
                    type="password"
                    id="password"
                    ref={passwordRef}
                ></input>
                <div className="flex items-center">
                    {errorMessage && <object
                        className="w-4 h-4 mx-2 mt-2"
                        // height="90%"
                        // width="80%"
                        type="image/svg+xml"
                        data="/user-profile.svg"
                    >
                    </object>
                    }
                    <p className="text-red-400 text-xs mt-2">{errorMessage}</p>
                </div>
                </div>
                <button type="submit" className="text-sm bg-blue text-white w-full py-3 px-6 rounded-md mt-8">
                Login
                </button>
                <p className="text-sm mt-4">
                Not a member?
                <span onClick={pushToSignUp} className="text-blue font-semibold cursor-pointer">Sign Up</span>
                </p>
                </form>
            </div>
            </article>
        </section>
        <section className="w-0 md:w-1/2 grid place-items-center bg-gray-100">
            <object
                className="w-90% h-90% lg:w-4/5 lg:h-4/5"
                type="image/svg+xml"
                data="/illustration.svg"
            >
            </object>
        </section>
        </main>
    );
}

export default Login;
