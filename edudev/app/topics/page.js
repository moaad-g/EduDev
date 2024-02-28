'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 

const ListTopics = () => {
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        ;(async () => {
        console.log(db);
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
    <div className="flex justify-center">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <ul>
        {topicList.map(item => (
          <li key={item} className="py-4">
            <a href={"topics/"+item} className="font-bold text-l hover:text-blue-300">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTopics;