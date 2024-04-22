'use client'
import Image from 'next/image'
import React, { useState , useContext, useEffect } from "react";
import { AuthContext } from "@/app/layout";
import { auth } from "@/app/firebase";
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import { Button , Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { db } from "@/app/firebase";
import { doc, getDoc, collection , getDocs } from "firebase/firestore";
import { Accordion, AccordionDetails, AccordionSummary, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';


// 1st make dict of progress
// check user collection
// check quiz ids
// check pages read
// totalprog = numofquizids/pagenum+quiznum

const ProfilePage = () => {
    const [topicList, setTopicList] = useState([]);
    var user = useContext(AuthContext);
    const [displayName,setUsername] = useState("");
    const [enableEdit,setEnableEdit] = useState(false);
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const [currentUsername,setCurrentUsername] = useState('');
    const router = useRouter();
    const [progress, setProgress] = useState(null);
    const [preProgress,setPreProgress] = useState(null);

    useEffect(() => {
        (async () => {
        try {
          const docRef = doc(db, "collectionList", "topicList");
          const docSnap = await getDoc(docRef);
          setTopicList(docSnap.data().topicList2)
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);

    useEffect (() => {
        (async() =>{
            if (preProgress){
                try {
                    var tempProgress = preProgress;
                    for (const title in preProgress){
                        console.log(title)
                        const docRef2 = collection(db, "Users", user.email, "LearningProgress" , title , "Quizzes" );
                        const histSnap = await getDocs(docRef2);
                        histSnap.forEach(doc => {
                            tempProgress[title]["quizzes"].push(doc.id);
                          });
                        }
                    setProgress(tempProgress)
            } catch (error) {
                console.error(error);
            }
        }})
        ();
    },[preProgress])

    useEffect (() => {
        (async() =>{
            try {
                if (user){
                    if (user.displayName){
                        setCurrentUsername(user.displayName)
                    }
                    var tempProgress = {}
                    const docRef = collection(db, "Users", user.email, "LearningProgress" );
                    const histSnap = await getDocs(docRef);
                    histSnap.forEach((doc) => {
                        if (doc.data().pagesRead) {
                            tempProgress[doc.id.toString()] = { pagesRead: doc.data().pagesRead ,  quizzes: [] }
                        } else {
                            tempProgress[doc.id.toString()] = { pagesRead: [] ,  quizzes: [] }
                        }
                      });
                    setPreProgress(tempProgress)
                }
            } catch (error) {
                console.error(error);
            }
        })
        ();
    },[user])

    const postUpdate = async(e) => {
        e.preventDefault()
        const usernameRes = updateProfile({ displayName });
        toast.promise( usernameRes ,{
            pending: "saving username...",
            success: "username updated!",
            error: "error saving username",
        },{
            position: "top-center",
            theme: "dark",
            autoClose: 1500
        })
        setEnableEdit(false);
        user = auth.currentUser;
        setCurrentUsername(user.displayName)
    }

    if (user){
        if (progress){
            
            return(
                <div className='grid grid-cols-2 h-screen'>
                    <div className='m-10'>
                        <h1 className='text-xl'>Progress:</h1>
                        <Paper className='h-4/5' elevation={24}>
                            <div className='py-5'>
                            {((Object.keys(progress)).length>0) ?
                                Object.keys(progress).map(item => {
                                    var topic = topicList.find(topic => topic.Title === item)
                                    return (
                                    <Accordion key={item} elevation={5} disableGutters className="rounded mx-4 text-white">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="course_content"
                                        id="course_content"
                                        className="font-bold text-l"
                                    >
                                        <div className='flex items-center justify between'>
                                            <p className='mr-20'>{item}</p>
                                            <div className='flex items-center'>
                                                <CircularProgress size={30} variant="determinate" color='info' value={Math.floor(((progress[item].quizzes.length)+(progress[item].pagesRead.length))/((topic.pageNum)+(topic.quizNum))*100)}/>
                                                <p className='ml-1 text-xs'>{Math.floor(((progress[item].quizzes.length)+(progress[item].pagesRead.length))/((topic.pageNum)+(topic.quizNum))*100)}% complete</p>
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='text-m mb-4'>
                                            <p>Content - {Math.floor((progress[item].pagesRead.length)/(topic.pageNum)*100)}%</p>
                                            <LinearProgress size={30} variant="determinate" color='info' value={Math.floor((progress[item].pagesRead.length)/(topic.pageNum)*100)}/>
                                            <div className='mt-4'>
                                                Pages Read:
                                                <div>
                                                {(progress[item].pagesRead).map((page) => (
                                                    <a href={"/topics/"+topic.Title+"/content/"+page} className='hover:text-blue-500' >-{page}</a>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-m'>
                                            <p>Quizzes - {Math.floor((progress[item].quizzes.length)/(topic.quizNum)*100)}%</p>
                                            <LinearProgress size={30} variant="determinate" color='info' value={Math.floor((progress[item].quizzes.length)/(topic.quizNum)*100)}/>
                                            <div className='mt-4'>
                                            Quizzes Completed:
                                                <div>
                                                {(progress[item].quizzes).map((quiz) => (
                                                    <a href={"/topics/"+topic.Title+"/quiz/"+quiz} className='hover:text-blue-500' >-{quiz}</a>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </AccordionDetails>
                                    </Accordion>
                                )})
                            :
                            <div className='m-5'>
                                Start Learning! Click the Learn Icon in the navbar to get started!
                            </div>
                            }   
                            </div>    
                        </Paper>
                    </div>
                    <div className='m-10'>
                        <h1 className='text-xl'>Profile:</h1>
                        <Paper className='h-4/5' elevation={24}>
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
                    </Paper>
                    </div>
                </div>
            )
        } else {
            return (
                <p>wee</p>
        )}
    } else {
        <div> loading profile </div>
    }
}



export default ProfilePage;