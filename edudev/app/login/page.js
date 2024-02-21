'use client'
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(email, password);
      console.log(res);
      setEmail('');
      setPassword('');
      router.push('/')
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  }
    return (
        <div className="flex items-center justify-center h-screen">
            <form className="bg-gray-800 p-8 shadow-md rounded-md border border-slate-700" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email:
                </label>
                <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md focus:text-black"
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
                className="w-full p-2 border focus:text-black rounded-md"
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
        </div>
        );
    };
  
  
export default Login;