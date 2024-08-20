'use client'
import { doc, setDoc ,getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import React, { useEffect, useState, useContext } from "react";

const addQuestions = () => {

    const quizID = "Introduction"
    const q_type = 1;
    const Question = "Fill in the blank.";
    const Answers = ["", "is a term describing the components used to enable a digital service","Infrastructure"];
    const correct = 2;

    const docRef = doc(db, "Infrastructure", "Content", "Quizzes", quizID);
    const newQ = {q_type:q_type , Question:Question , Answers:Answers, correct:correct}

    const addq = async() =>{
        
        const newdoc = await getDoc(docRef)
        const quizInfo = newdoc.data().quizInfo
        await setDoc(docRef, { quizInfo: [...quizInfo , newQ] });
        

        // await setDoc(docRef, { quizInfo: [newQ] });


    }

    return(
        <div>
            <button onClick={()=>addq()}>ye</button>
        </div>
    )
}

export default addQuestions;

