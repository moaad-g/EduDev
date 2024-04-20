'use client'
import Image from 'next/image'
import { useContext, useState } from 'react';
import { AuthContext } from "@/app/layout";
import { AppBar , Toolbar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import SchoolIcon from '@mui/icons-material/School';
import { signOut } from 'firebase/auth';
import { auth } from "@/app/firebase";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";



export default function Navbar() {
    const router = useRouter();
    const user = useContext(AuthContext);
    const [accountMenu, setAccountMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

    const redirectProfile = () => {
        setAnchorEl(null);
        router.push('/profile')
    }
    return(
        <AppBar position='static'>
            <Toolbar className='flex justify-between'>
                <div className='flex flex-row justify-between items-center my-4 mx-3'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Image
                            onClick={() => router.push('/')}
                            className='cursor-pointer'
                            src={"/images/EDUDEV.png"}
                            width={170}
                            height={85}
                            alt="edudev logo"
                            priority
                        />
                    </motion.div>
                    <div className='mx-10 flex'>
                        <motion.div
                            className='flex cursor-pointer'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push('/sandbox')}
                        >
                            <InventoryIcon/>
                            <p className='font-bold'>SANDBOX</p>
                        </motion.div>
                        <motion.div
                            className='flex cursor-pointer mx-8'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push('/topics')}
                        >
                            <SchoolIcon className='scale-125 mr-1'/>
                            <p className='font-bold'>LEARN</p>
                        </motion.div>
                    </div>
                </div>
                <div>
                    {user && (
                        <div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                            >
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
                                    <AccountBoxIcon className='scale-125' />
                                </IconButton>
                            </motion.div>
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
                                <MenuItem onClick={() => redirectProfile()}>Profile</MenuItem>
                                <MenuItem onClick={() => signOut(auth)} className="hover:bg-red-300">Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!user &&(
                        <div>
                            <a href="/login" className="text-white mx-5 bg-blue-600 hover:text-gray-300 hover:bg-blue-700 rounded px-2 py-1 block font-bold">Login</a>
                        </div>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    )
}