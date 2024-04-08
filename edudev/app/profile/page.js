'use client'
import Image from 'next/image'
import React, { useState , useContext, useEffect } from "react";
import { AuthContext } from "@/app/layout";
import { auth } from "@/app/firebase";
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';


const ProfilePage = () => {
    var user = useContext(AuthContext);
    const [displayName,setUsername] = useState("");
    const [enableEdit,setEnableEdit] = useState(false);
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [currentUsername,setCurrentUsername] = useState('');
    const router = useRouter();

    const postUpdate = async(e) => {
        e.preventDefault()
        const usernameRes = updateProfile({ displayName });
        toast.promise( usernameRes ,{
            pending: "saving username...",
            success: "username updated!",
            error: "shitden"
        })
        setEnableEdit(false);
        user = auth.currentUser;
        setCurrentUsername(user.displayName)
    }
    useEffect(() => {
        if (user){
            if (user.displayName){
                setCurrentUsername(user.displayName)
            }
        }
    })
    if (user){
        return (
            <div className='grid grid-cols-2 h-screen'>
              <div className='m-10'>
                <h1 className='text-xl'>Progress:</h1>
                <div className='bg-gray-800 rounded mt-2'>
                    accordion babyeh                    
                </div>
              </div>
              <div className='m-10'>
                <h1 className='text-xl'>Profile:</h1>
                <div className='bg-gray-800 rounded mt-2'>
                    <div>
                        <form className="flex flex-col mx-4 py-4" onSubmit={postUpdate}>
                            <label>Edit Username:</label>
                            <div>
                                <input
                                type="text"
                                id="username"
                                className={`w-2/3 p-1 border focus:text-black rounded-md text-black mr-1 ${ (displayName.length >= 8) ? 'border-4 border-red-600' : ''}`} 
                                placeholder={currentUsername ? currentUsername: "no username set"}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled = {!enableEdit}
                                />
                                { enableEdit && (
                                    <>
                                        <Button className='bg-green-500 text-white hover:bg-green-800' type="submit">Save</Button>
                                        { (displayName.length >= 8) && (
                                            <p>username must be between 1 and 10 characters long</p>
                                        )}
                                    </>
                                )}
                                { !enableEdit &&
                                    <Button className='bg-blue-500 text-white hover:bg-blue-800' onClick={() => setEnableEdit(true)}>Edit</Button>
                                }
                            </div>
                        </form>
                    </div>                 
                </div>
              </div>
            </div>  
          );
    } else {
        <div> loading profile </div>
    }
}



export default ProfilePage;