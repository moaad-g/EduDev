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
            console.log(docSnap.data().quizInfo[0].Question)
            setQuizInfo(docSnap.data().quizInfo);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);

  return (
    <div>
        <Question quizInfo={quizInfo} />
    </div>
  );
};
export default Quiz;