'use client'
import Navbar from './../components/navbar';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase";
import { Inter } from 'next/font/google'
import './globals.css'
import { createContext } from 'react';

const inter = Inter({ subsets: ['latin'] })
export const AuthContext = createContext();

export default function RootLayout({ children }) {
  const [user] = useAuthState(auth);
  
  return (
    <AuthContext.Provider value={user}>
      <html lang="en">
          <body className={inter.className}>
            <div><Navbar /></div>
            <div>{children}</div>
          </body>
      </html>
    </AuthContext.Provider>
  )
}
