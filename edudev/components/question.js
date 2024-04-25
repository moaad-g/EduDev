import React, { useEffect, useState, useContext } from "react";
import { Reorder } from "framer-motion";
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext } from "@/app/layout";
import { db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button, IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/joy/Typography';
import {Chart as ChartJS,
    ArcElement,
    Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Legend
)

const Question = ({ quizInfo , quizHistory, docRef , quizID }) => {
    const user = useContext(AuthContext);
    const [quizStart, setQuizStart] = useState(true);
    const [quizEnd, setQuizEnd] = useState(false);

    const [questionNum, setQuestionNum] = useState(0);
    const [score, setScore] = useState(0);
    const [selection, setSelection] = useState('');
    const question = quizInfo[questionNum].Question;
    const answerList = quizInfo[questionNum].Answers;
    const correctAns = quizInfo[questionNum].Answers[quizInfo[questionNum].correct];
    const questionType = quizInfo[questionNum].q_type;
    const [selectionList, setSelectionList] = useState([]);
    
    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return (array)
    }

    if (questionType === 2 && selectionList.length === 0) {
        setSelectionList(shuffleArray(answerList.slice(answerList.length / 2, answerList.length)));
    }
    

    const handleNext = () => {
        if (questionType === 2){
            if (selectionList == correctAns){
                setScore(score+1);
            }
            setSelectionList([])
        } else {
            if (selection == correctAns){
                setScore(score+1);
            }
        }
        setSelection('');
        if (questionNum < quizInfo.length - 1) {
            setQuestionNum(questionNum + 1);
        } else {
            setQuizEnd(true);
        }
        
    };

    const saveScore  = async(day , finalScore) => {
        // { quizID : [] }
        var newHistory = [];        
        if (quizHistory.History){
            const oldHistory = quizHistory.History;
            newHistory = [...oldHistory, {date:day , score:finalScore}]

        } else {
            newHistory = [{date:day , score:finalScore}]
        }
        try{
            await setDoc(docRef, { History: newHistory });
        } catch (error){
            console.error('Error uploading data: ', error);
        }
    }
    
    const renderQuestion = () => {
        if (quizStart){
            return (
                <div className='bg-gray-800 flex flex-col justify-between rounded-lg w-full h-full relative shadow-xl p-7'>
                    <div className="flex justify-center mt-1">
                        <Typography level="h4" className="font-bold">Start Quiz</Typography>
                    </div>
                    {(user) && 
                        quizHistory.History ? (
                        <div className="overflow-y-auto max-h-64">
                            <div className="mb-4 flex justify-center">
                                <Typography level="h5" className="underline font-bold">Quiz History</Typography>
                            </div>
                            <div className="flex justify-center">
                            <table className="table-fixed">
                                <thead className="p-3 border-b">
                                    <th>Score</th>
                                    <th>Date</th>
                                </thead>
                                <tbody>
                                {quizHistory.History.map((ans) =>
                                <tr className="border-b">
                                    <td className="px-4 py-2">{ans.score}%</td>
                                    <td className="px-4 py-2">{ans.date}</td>
                                </tr>
                                )}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    ):
                    <div className="flex justify-center">
                        <Typography level="h5" className="font-bold">This is your first attempt at this quiz. Good Luck!</Typography>
                    </div>
                    }
                    
                <div className="flex justify-end">
                    <Button
                        className="my-5 mx-3 px-5 py-2"
                        variant="outlined"
                        color="info"
                        onClick={() => setQuizStart(false)}
                    >
                        START
                    </Button>
                </div>
            </div>
            )
        }
        if (quizEnd){
            var thisQuizHistory = []
            const finalScore = Math.floor((score/quizInfo.length)*100);
            const date = new Date();
            if (user){
                saveScore((date.toString()),finalScore)                                
            }
            const data = {
                datasets: [{
                    data:[score,quizInfo.length-score] , 
                    backgroundColor: ['green','transparent'],
                    borderColor: ['green','red'],
                }]
            }
            return (
                <div className='bg-gray-800 rounded-lg w-full h-full shadow-lg relative shadow-xl p-7'>
                    <div className="flex justify-center mt-1">
                        <Typography level="h4" className="font-bold">Quiz Complete!</Typography>
                    </div>
                    <div className="flex justify-between">
                        <div className="">
                            <p className="ml-2">You Scored {finalScore}%</p>
                            <Doughnut className="scale-50" data={data} options={{}}></Doughnut>
                        </div>
                        <div className="overflow-y-auto max-h-64">
                            {(user) && 
                                    quizHistory.History ? (
                                    <div className="flex justify-center overflow-y-auto max-h-64 max-w-1/2">
                                        <div className="mb-4 flex justify-center">
                                            <Typography level="h5" className="underline font-bold">Quiz History</Typography>
                                        </div>
                                        <div className="flex justify-center">
                                        <table className="table-fixed">
                                            <thead className="p-3 border-b">
                                                <th>Score</th>
                                                <th>Date</th>
                                            </thead>
                                            <tbody>
                                            {quizHistory.History.map((ans) =>
                                            <tr className="border-b">
                                                <td className="px-4 py-2">{ans.score}%</td>
                                                <td className="px-4 py-2">{ans.date}</td>
                                            </tr>
                                            )}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                ):
                                <div className="flex justify-center">
                                    <Typography level="h5" className="font-bold">No Quiz History</Typography>
                                </div>
                                }
                        </div>
                    </div>
                </div>
            )
        }
        if (questionType === 0) {
            return (
                <div className='bg-gray-800 rounded-lg shadow-xl p-4'>
                    <h2 className="text-2xl mb-4">{question}</h2>
                    <div className="grid grid-cols-2">
                        {answerList.map((answer) => (
                            <button
                                key={answer}
                                className={`rounded m-3 hover:shadow-xl h-20 p-4 ${selection === answer ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-900'}`}
                                onClick={() => setSelection(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button
                        className="my-5 mx-3 w-4 px-5 py-2"
                        variant="outlined"
                        color="info"
                        onClick={handleNext}
                        disabled={!selection}
                        >
                            {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                        </Button>
                    </div>
                </div>
            );
        } else if (questionType === 1) {
            return (
                <div className='bg-gray-800 rounded-lg shadow-xl p-4'>
                    <div className='mb-5 flex justify-between'>
                        <h2 className='underline text-l'>Question {questionNum + 1} of {quizInfo.length}</h2>
                        <Tooltip title="Hint: Drag the items in the right hand column to answer the question">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="">
                    <h2 className="text-2xl my-5">{question}</h2>
                    <div className="flex">
                        <p>{answerList[0]}</p>
                        <input
                            type="text"
                            className="bg-gray-800 rounded border focus:bg-gray-900 mx-3"
                            value={selection}
                            size={selection.length || 1}
                            onChange={(e) => setSelection(e.target.value)}
                        />
                        <p>{answerList[1]}</p>
                    </div>
                    </div>
                    <div className="flex flex-col justify-end">
                    <div className="flex justify-end">
                        <Button
                                className="mt-10 w-4 font-bold px-5 py-2"
                                variant="outlined"
                                color="info"
                                onClick={handleNext}
                                disabled={selection.length === 0}
                            >
                                {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                        </Button>
                    </div>
                    </div>
                </div>
            );
        } else if (questionType === 2) {
            return (
                <div className='bg-gray-800 rounded-lg shadow-xl p-4'>
                    <div className='mb-5 flex justify-between'>
                        <h2 className='underline text-l'>Question {questionNum + 1} of {quizInfo.length}</h2>
                        <Tooltip title="Hint: Drag the items in the right hand column to answer the question">
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <h2>{question}</h2>
                    <div className="grid grid-cols-2 gap-4 flex flex-col items-center">
                        <div>
                            <ul> 
                                {answerList.slice(0, answerList.length / 2).map((answer) => (
                                    <li key={answer} className='h-20 p-4 shadow-xl mt-3 overflow-hidden'>
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Reorder.Group axis="y" values={selectionList} onReorder={setSelectionList} className="justify-center items-center">
                                {selectionList.map(selection => (
                                    <Reorder.Item value={selection}  key={selection}>
                                        <p className='cursor-grab border border-gray-900 rounded p-4 h-20 bg-gray-800 hover:bg-gray-900 hover:shadow-xl mt-3 overflow-hidden'>
                                            {selection}
                                        </p>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        </div>
                    </div>
                    <div className="flex justify-end">
                            <Button
                                className="my-5 mx-3 px-5 py-2"
                                variant="outlined"
                                color="info"
                                onClick={handleNext}
                                disabled={selectionList.length === 0}
                            >
                                {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                            </Button>
                        </div>
                </div>
            );
        }
    };
    return renderQuestion();
};

export default Question;

