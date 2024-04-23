'use client'
import { doc, setDoc ,getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import React, { useEffect, useState, useContext } from "react";

const addQuestions = () => {

    const quizID = "DevOps3"
    const q_type = 2;
    const Question = "Match the terms and their definitions";
    const Answers = ["Edudev", "DevOps","An educational platform" , "A software methodology"];
    const correct = 0;

    const docRef = doc(db, "Introduction", "Content", "Quizzes", quizID);
    const newQ = {q_type:q_type , Question:Question , Answers:Answers, correct:correct}

    const addq = async() =>{
        
        const newdoc = await getDoc(docRef)
        const quizInfo = newdoc.data().quizInfo
        await setDoc(docRef, { quizInfo: [...quizInfo , newQ] });
    }

    return(
        <div>
            <button onClick={()=>addq()}>ye</button>
        </div>
    )
}

export default addQuestions;

