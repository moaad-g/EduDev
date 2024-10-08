'use client'
import React, { useState , useContext } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/layout";
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Login = () => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();


  const logOut = () =>{
    signOut(auth)
    router.push('/')
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(email, password);
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error('Email/Password Invalid!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
    return (
        <div className="flex items-center justify-center h-screen">
          {!user && (
            <Paper elevation={10}>
            <form className="p-8" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email:
                </label>
                <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md focus:text-black text-black"
                placeholder="example@company.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2 focus:text-gray-800" htmlFor="password">
                Password:
                </label>
                <input
                type="password"
                id="password"
                className="w-full p-2 border focus:text-black rounded-md text-black"
                placeholder="*******"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Login
            </button>
            <div className="py-2">
                <a href="/sign-up" className="text-gray-300 text-align:center text-sm hover:text-blue-300">don't have an account?</a>
            </div>
            </form>
            </Paper>
          )}
          {user &&(
            <Paper elevation={10} className="items-center p-10">
              <div>
                <h2 className="text-2xl font-bold mb-10">Youre Already Logged In</h2>
              </div>
              <div className="flex justify-center">
                <a href="/" className="text-white mx-5 hover:text-blue-300 rounded px-2 py-1 block">Back to Edudev</a>
                <button onClick={()=>logOut()} className="text-white mx-5 bg-red-600 hover:text-gray-300 hover:bg-red-700 rounded px-2 py-1 block font-bold">Logout</button>
              </div>
            </Paper>
          )}
        </div>
        );
    };
  
  
export default Login;