'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect , useContext } from "react";
import MarkDown from 'react-markdown'
import { Container , Paper, Checkbox } from '@mui/material';
import { AuthContext } from "@/app/layout";
import Typography from '@mui/joy/Typography';
import { doc, getDoc , setDoc } from "firebase/firestore";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { toast } from 'react-toastify'
import rehypeRaw from "rehype-raw";




const ShowContent = ({ params }) => {
    const user = useContext(AuthContext);
    const [mdtext,setMD] = useState();
    const [histRef , setHistRef] = useState(null);
    const contentID = params.contentID;
    const topicName = params.topicName;
    const [userProgress, setProgress] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [pagePos , setPagePosition] = useState(0);
    const nextID = pageList[pagePos+1]
    const prevID = pageList[pagePos-1]


    useEffect(() => {
        ;(async () => {
        try {
          const colRef2 = doc(db, topicName, "Content");
          const col2 = await getDoc(colRef2);
          setPageList(col2.data().Titles);
          setPagePosition(pageList.indexOf(contentID));
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);

    useEffect (() => {
        (async() =>{
            const filePath = "/Content/"+topicName+"/"+contentID+".md"
            try {
                const response = await fetch(filePath);
                const data = await response.text();
                setMD(data);
                if (user){
                    const docRef = doc(db, "Users", user.email, "LearningProgress", topicName );
                    const histSnap = await getDoc(docRef);
                    setHistRef(docRef);
                    setProgress(histSnap.data().pagesRead);
                }
            } catch (error) {
                console.error(error);
            }
        })
        ();
    },[user])

    const editHistory = async(e) => {
        var placeholderList = [];
        placeholderList = [...userProgress];
        if (e.target.checked){
            placeholderList.push(contentID);
        } else {
            placeholderList.splice(placeholderList.indexOf(contentID), 1);
        }
        try{
            const setHistory = await setDoc(histRef, { pagesRead: placeholderList }, { merge: true });
            setProgress(placeholderList);
            toast.success('Progress Saved', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error){
            console.error('Error uploading data: ', error);
            toast.error('Progress Upload Error', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    //const textbody = marked.parse(mdtext)
    //
    return(
        <Container>
            <div className="flex justify-center mt-10">
                <Typography level="h5" className="font-bold">{topicName.toUpperCase()} - {contentID.toUpperCase()}</Typography>
            </div>
            <Paper className="m-4">     
                <div className="flex items-center justify-between">
                    <div>
                        {(pagePos > 0) && (
                            <div className="flex">
                                <NavigateBeforeIcon />
                                <a href={topicName+"/content/"+prevID} className="font-bold text-l hover:text-blue-300 rounded" >Previous Page</a>
                            </div>
                        )}
                    </div>
                    <div>
                        {(pagePos < pageList.length) && (
                            <div className="flex m-3">
                                <a href={topicName+"/content/"+nextID} className="font-bold text-l hover:text-blue-300 rounded" >Next Page</a>
                                <NavigateNextIcon />
                            </div>
                        )}
                    </div>
                </div>
                <MarkDown rehypePlugins={[rehypeRaw]} className="text-xl m-5">{mdtext}</MarkDown>
                <div className="flex items-center justify-end">
                    <p >Mark Read</p>
                    <Checkbox
                    checked={userProgress.includes(contentID)} 
                    onChange={(e) => editHistory(e)}
                    color="secondary" />
                </div>
            </Paper>
        </Container>
    )

}
export default ShowContent;