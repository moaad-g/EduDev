'use client'
import Navbar from './../components/navbar';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase";
import { Inter } from 'next/font/google'
import './globals.css'
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles'; 

const inter = Inter({ subsets: ['latin'] })
export const AuthContext = createContext();

export default function RootLayout({ children }) {
  const [user] = useAuthState(auth);
  const theme = createTheme ({
    palette: {
      mode: 'dark',
      primary: {
        main: '#090a27',
      },
      secondary: {
        main: '#4c69dc',
      },
      text: {
        primary: 'rgba(255,255,255,0.87)',
        secondary: 'rgba(255,255,255,0.6)',
        disabled: 'rgba(255,255,255,0.38)',
      },
      background: {
        paper: '#090a27',
      },
    },
    });
  
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={user}>
        <html lang="en">
            <body className={`h-screen h-full ${inter.className}`}>
              <ToastContainer />
              <Navbar />
              <div>{children}</div>
            </body>
        </html>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}
