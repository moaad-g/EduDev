'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect , useContext } from "react";
import ReactMarkdown from 'react-markdown'
import { Container , Paper, Checkbox } from '@mui/material';
import { AuthContext } from "@/app/layout";
import Typography from '@mui/joy/Typography';
import { doc, getDoc } from "firebase/firestore";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';



const ShowContent = ({ params }) => {
    const user = useContext(AuthContext);
    const [mdtext,setMD] = useState();
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
          setPageList(col2.data().Titles)
          setPagePosition(pageList.indexOf(contentID))
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
                    const histRef = doc(db, "Users", user.email, "LearningProgress", topicName );
                    const histSnap = await getDoc(histRef);
                    console.log(histSnap.data())
                }
            } catch (error) {
                console.error(error);
            }
        })
        ();
    },[user])

    //const textbody = marked.parse(mdtext)
    //
    return(
        <Container>
            <Typography level="h4" className="font-bold">{topicName} - {contentID}</Typography>
            <Paper className="m-4">     
                <div className="flex items-center justify-between">
                    <div>
                        {(pagePos > 0) && (
                            <div className="flex">
                                <NavigateBeforeIcon />
                                <a href={topicName+"/content/"+prevID}>go forth</a>
                            </div>
                        )}
                    </div>
                    <div>
                        {(pagePos < pageList.length) && (
                            <div className="flex m-3">
                                <a href={topicName+"/content/"+nextID}>go forth</a>
                                <NavigateNextIcon />
                            </div>
                        )}
                    </div>
                </div>
                <ReactMarkdown className="text-xl m-4">{mdtext}</ReactMarkdown>
                <div className="flex items-center justify-end">
                    <p >Mark Read</p>
                    <Checkbox color="secondary" />
                </div>
            </Paper>
        </Container>
    )

}
export default ShowContent;