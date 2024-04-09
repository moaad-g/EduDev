'use client'
import { db } from "@/app/firebase";
import React, { useState, useEffect } from "react";
import { getDoc, getDocs , collection , doc } from "firebase/firestore"; 
import { Accordion, AccordionDetails, AccordionSummary, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ListTopic = ({ params }) => {
    const [quizList, setQuizList] = useState([]);
    const [textList, setTextList] = useState([]);
    const topicName = params.topicName;


    useEffect(() => {
        ;(async () => {
        try {
          const colRef = collection(db, topicName, "Content", "Quizzes");
          const colRef2 = doc(db, topicName, "Content");
          const col1 = await getDocs(colRef);
          const col2 = await getDoc(colRef2);
          col1.forEach((doc) => {
            setQuizList(quizList => [...quizList, doc.id])
          });
          setTextList(col2.data().Titles)
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      })
      ();
    }, []);

  return (
    <Container>
      <div className="flex justify-center mt-10">
        <Typography level="h2" className="font-bold">{topicName} Course Overview</Typography>
      </div>
      <Accordion disableGutters className="rounded m-10 text-white">
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="course_content"
          id="course_content"
          className="font-bold text-xl"
        >
          Course Content
        </AccordionSummary>
        <AccordionDetails>
          <ul className="">
            {textList.map(item => (
              <li key={item} className="list-disc m-3">
                <a href={topicName+"/content/"+item} className="font-bold text-l hover:text-blue-300 rounded" >{item}</a>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters className="rounded m-10 text-white">
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="course_content"
          id="course_content"
          className="font-bold text-xl"
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