'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 

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
    <div className="w-3/5 mx-auto flex flex-col items-center">
      <h2 className="text-4xl relative top-20 font-bold mb-4">Topics</h2>
      <div className="flex-1"></div>
      <div>
        <ul className="text-xl flex-1 flex justify-center items-center relative top-20">
          {topicList.map(item => (
            <li key={item} className="p-10">
              <a href={"topics/"+item} className="font-bold text-l hover:text-blue-300 hover:bg-gray-700 rounded p-8" >{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListTopics;