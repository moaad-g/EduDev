'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import Typography from '@mui/joy/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import QuizIcon from '@mui/icons-material/Quiz';
import { CardActionArea, Container, Card , CardContent } from '@mui/material';


const ListTopics = () => {
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        ;(async () => {
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

  return (
    <Container className="h-screen">
      <div className="flex justify-center mt-10">
        <Typography level="h5" className="font-bold">COURSES</Typography>
      </div>
        <div className="grid grid-cols-2">
          {topicList.map(item => (
            <Card key={item} className="m-8">
              <CardActionArea disabled={!item.available} href={"topics/"+item.Title} className="p-10 h-full">
                <CardContent>
                  <h2 className="text-xl mb-3 font-bold">{item.Title}</h2>
                  <p>{item.Bio}</p>
                </CardContent>
                <div className="flex justify-between mt-3">
                  <p className="text-m text-gray-400">Click To View Course</p>
                  <div className="flex">
                    <div className="flex items-center mr-5">
                      <InsertDriveFileIcon/>
                      <p>{item.pageNum}</p>
                    </div>
                    <div className="flex items-center mr-5">
                      <QuizIcon/>
                      <p>{item.quizNum}</p>
                    </div>
                  </div>
                </div>
              </CardActionArea>
            </Card>
          ))}
        </div>
    </Container>
  );
};

export default ListTopics;