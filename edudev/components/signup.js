'use client'
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { Paper } from '@mui/material';
import { toast } from 'react-toastify';


const SignUpComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const router = useRouter();
  const [createUser , user ,loading , error ]= useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser(email,password);
      if (res.user){
        toast.success('Registration Successful!', {
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
      setEmail('');
      setPassword('');
      setConfPass('');
      router.push('/');
    } catch (error) {
      console.error("Error:", error.message);
      toast.error('User already exists', {
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
  };
    return (
        <Paper elevation={10}>
        <form className="p-8" onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email:
                </label>
                <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md focus:text-black text-black"
                placeholder={email.length>0 ? email :"example@company.com"}
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
                className="w-full p-2 border focus:text-black text-black rounded-md"
                placeholder={password.length>0 ? password :"*******"}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2 focus:text-gray-800" htmlFor="password">
                Confirm Password:
                </label>
                <input
                type="password"
                id="confirm"
                className="w-full p-2 border focus:text-black text-black rounded-md"
                placeholder={confPass.length>0 ? confPass :"*******"}
                onChange={(e) => setConfPass(e.target.value)}
                required
                />
            </div>
            <button
                type="submit"
                className={`w-full text-white p-2 rounded ${ (password != confPass || password.length<8) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover: bg-blue-600'}`}
                disabled={password != confPass || password.length<8}
            >
                Sign Up
            </button>
            {(password != confPass) &&(
              <p className="text-xs my-1">-passwords must match</p>
            )}
            {(password.length<8) &&(
              <p className="text-xs my-1">-passwords must be 8 characters minimum</p>
            )}
            <div className="py-2">
                <a href="/login" className="text-gray-300 text-align:center text-sm hover:text-blue-300">already have an account?</a>
            </div>
        </form>
        </Paper>
        );
    };
  
  
export default SignUpComp;