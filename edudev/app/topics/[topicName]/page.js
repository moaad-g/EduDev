'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDocs , collection } from "firebase/firestore"; 

const ListTopic = ({ params }) => {
    const [quizList, setQuizList] = useState([]);
    const [textList, setTextList] = useState([]);
    const topicName = params.topicName;


    useEffect(() => {
        ;(async () => {
        try {
          const colRef = collection(db, topicName, "Content", "Quizzes");
          const colRef2 = collection(db, topicName, "Content", "Texts");
          const col1 = await getDocs(colRef);
          const col2 = await getDocs(colRef2);
          col1.forEach((doc) => {
            setQuizList(quizList => [...quizList, doc.id])
          });
          col2.forEach((doc) => {
            setTextList(textList => [...textList, doc.id])
          });
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);

  return (
    <div className="w-3/5 mx-auto flex flex-col items-center">
        <h2 className="text-4xl relative top-20 font-bold underline drop-shadow-lg mb-4">{topicName}</h2>
        <div className="flex w-full">
            <div className="flex flex-col items-start">
                <h2 className="text-2xl relative top-20 font-bold">Content:</h2>
                <ul className="text-xl relative top-20">
                {textList.map(item => (
                    <li key={item} className="list-disc p-3">
                    <a href={"topics/"+topicName+"/quiz/"+{item}} className="font-bold text-l hover:text-blue-300 rounded" >{item}</a>
                    </li>
                ))}
                </ul>
                <h2 className="text-2xl relative top-20 font-bold ma-10">Quizzes:</h2>
                <ul className="text-xl relative top-20">
                {quizList.map(item => (
                    <li key={item} className="list-disc p-3">
                    <a href={"topics/"+topicName+"/quiz/"+{item}} className="font-bold text-l hover:text-blue-300 rounded" >{item}</a>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  );
};
export default ListTopic;