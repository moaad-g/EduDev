'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import Typography from '@mui/joy/Typography';
import { CardActionArea, Container, Card } from '@mui/material';


const ListTopics = () => {
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        ;(async () => {
        try {
          const docRef = doc(db, "collectionList", "topicList");
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().topicList);
          setTopicList(docSnap.data().topicList)
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
              <CardActionArea href={"topics/"+item} className="p-10">
                <h2 className="text-xl font-bold">{item}</h2>
                <p className="text-m">Click To View Course</p>
              </CardActionArea>
            </Card>
          ))}
        </div>
    </Container>
  );
};

export default ListTopics;