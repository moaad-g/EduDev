'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
    <Container>
      <div className="flex justify-center mt-10">
        <h2 className="text-4xl font-bold underline">Courses</h2>
      </div>
        <div className="grid grid-cols-2">
          {topicList.map(item => (
            <Card key={item} className="m-10 shadow-xl text-white bg-gray-900 hover:bg-gray-800">
              <CardActionArea href={"topics/"+item} className="p-10">
                <h2 className="text-l font-bold">{item}</h2>
                <p className="text-sm">Click To View Course</p>
              </CardActionArea>
            </Card>
          ))}
        </div>
    </Container>
  );
};

export default ListTopics;