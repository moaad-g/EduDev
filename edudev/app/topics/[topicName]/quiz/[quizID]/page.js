'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDoc , collection } from "firebase/firestore";
import Question from "@/components/question";

const Quiz = ({ params }) => {
    const [quizInfo, setQuizInfo] = useState([]);
    const topicName = params.topicName;
    const quizID = params.quizID;

    useEffect(() => {
        ;(async () => {
        try {
            const docRef = doc(db, topicName, "Content", "Quizzes", quizID);
            const docSnap = await getDoc(docRef);
            setQuizInfo(docSnap.data().quizInfo);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);
  if (quizInfo.length === 0){
    return (
      <div>
        <p>loading</p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 rounded-lg shadow-lg relative w-2/5 h-2/3 shadow-xl">
          <Question quizInfo={quizInfo} />
        </div>
      </div>
    );
  }
};
export default Quiz;