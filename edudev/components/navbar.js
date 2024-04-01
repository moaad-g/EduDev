'use client'
import AppBar from '@mui/material/AppBar';
import { useContext, useState } from 'react';
import { AuthContext } from "@/app/layout";
import { Toolbar, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signOut } from 'firebase/auth';
import { auth } from "@/app/firebase";



export default function Navbar() {
    const user = useContext(AuthContext);
    const [accountMenu, setAccountMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState();
    console.log(user);
    return(
        <AppBar position='static' className='bg-gray-900'>
            <Toolbar className='flex justify-between'>
                <div className='flex flex-row justify-between items-center m-4'>
                    <a href="/" class="text-white hover:text-gray-300 rounded px-2 py-1 block font-bold text-xl italic">Edudev</a>
                    <div className='mx-3 flex'>
                        <a href="/topics" class="text-white hover:text-gray-300 rounded px-2 py-1 block font-bold">Learn</a>
                        <a href="/sandbox" class="text-white hover:text-gray-300 rounded px-2 py-1 block font-bold">Sandbox</a>
                    </div>
                </div>
                <div>
                    {user && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="open account menu"
                                aria-controls="appbarMenu"
                                aria-haspopup="true"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                color="inherit"
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="appbarMenu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem onClick={() => console.log("wee")}>Profile</MenuItem>
                                <MenuItem onClick={() => signOut(auth)} className="hover:bg-red-300">Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!user &&(
                        <div>
                            <a href="/login" class="text-white mx-5 bg-blue-600 hover:text-gray-300 hover:bg-blue-700 rounded px-2 py-1 block font-bold">Login</a>
                        </div>

                    )}
                </div>
            </Toolbar>
        </AppBar>
        
    )
}