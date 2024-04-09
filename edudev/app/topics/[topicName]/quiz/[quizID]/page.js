'use client'
import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc , collection } from "firebase/firestore";
import Question from "@/components/question";
import { AuthContext } from "@/app/layout";
import { db } from "@/app/firebase";


const Quiz = ({ params }) => {
  const user = useContext(AuthContext);  
  const [quizInfo, setQuizInfo] = useState([]);
  const [quizHistory, setQuizHistory] = useState({});
  const [quizRef, setQuizRef] = useState();
  const topicName = params.topicName;
  const quizID = params.quizID;

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, topicName, "Content", "Quizzes", quizID);
        const docSnap = await getDoc(docRef);
        setQuizInfo(docSnap.data().quizInfo);
        if (user){
            const docRef2 = doc(db, "Users", user.email, "LearningProgress", topicName , "Quizzes" , quizID );
            setQuizRef(docRef2);
            const quizSnap = await getDoc(docRef2);
            if (quizSnap.data()){
              setQuizHistory(quizSnap.data());
            }
        }
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    },[user]);

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
          <Question quizInfo={quizInfo} quizHistory={quizHistory} docRef={quizRef} quizID={quizID}/>
        </div>
      </div>
    );
  }
};
export default Quiz;