'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { doc, getDocs , collection } from "firebase/firestore"; 
import { Accordion, AccordionDetails, AccordionSummary, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    <Container>
      <div className="flex justify-center mt-10">
        <h2 className="text-4xl font-bold underline">{topicName} Course Overview</h2>
      </div>
      <Accordion disableGutters className="bg-gray-800 rounded m-10 text-white">
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="course_content"
          id="course_content"
          className="font-bold text-l underline"
        >
          Course Content
        </AccordionSummary>
        <AccordionDetails>
          <ul className="">
            {textList.map(item => (
              <li key={item} className="list-disc m-3">
                <a href={topicName+"/quiz/"+item} className="font-bold text-l hover:text-blue-300 rounded" >{item}</a>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters className="bg-gray-800 rounded m-10 text-white">
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="course_content"
          id="course_content"
          className="font-bold text-l underline"
        >
          Quizzes
        </AccordionSummary>
        <AccordionDetails>
          <ul className="">
            {quizList.map(item => (
              <li key={item} className="list-disc m-3">
                <a href={topicName+"/quiz/"+item} className="font-bold text-l hover:text-blue-300 rounded" >{item}</a>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ListTopic;