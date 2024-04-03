import React, { useState } from "react";
import { Reorder } from "framer-motion";
import InfoIcon from '@mui/icons-material/Info';

const Question = ({ quizInfo }) => {
    const [questionNum, setQuestionNum] = useState(0);
    const [score, setScore] = useState(0);
    const [showInfo, setShowinfo] = useState(false);
    const [selection, setSelection] = useState('');
    const [quizEnd, setQuizEnd] = useState(false);
    const question = quizInfo[questionNum].Question;
    const answerList = quizInfo[questionNum].Answers;
    const correctAns = quizInfo[questionNum].Answers[quizInfo[questionNum].correct];
    const questionType = quizInfo[questionNum].q_type;
    const [selectionList, setSelectionList] = useState([]);

    // Initialize selectionList for question type 2
    if (questionType === 2 && selectionList.length === 0) {
        setSelectionList(answerList.slice(answerList.length / 2, answerList.length));
    }


    const handleNext = () => {
        if (questionType === 2){
            if (selectionList == correctAns){
                setScore(score+1)
            }
        } else {
            if (selection == correctAns){
                setScore(score+1)
            }
        }
        setSelection('');
        if (questionNum < quizInfo.length - 1) {
            setQuestionNum(questionNum + 1);
        } else {
            setQuizEnd(true)  
        }
        
    };

    const renderQuestion = () => {
        if (quizEnd){
            const finalScore = score/quizInfo.length;
            const date = Date();
            const day = date.getDate()
            console.log(day)
            console.log(score)
            return (
                <div>
                    <p> Congrats </p>
                </div>
                
            )
        }
        if (questionType === 0) {
            return (
                <div className='m-4'>
                    <h2 className="text-2xl mb-4">{question}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {answerList.map((answer) => (
                            <button
                                key={answer}
                                className={`border border-gray-300 rounded-md p-4 ${selection === answer ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-600 hover:bg-gray-400'}`}
                                onClick={() => setSelection(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                        <button
                            className="mt-4 bg-blue-500 text-white p-2 w-1/3 rounded hover:bg-blue-600 mx-auto"
                            onClick={handleNext}
                            disabled={!selection}
                        >
                            {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                        </button>
                    </div>
                </div>
            );
        } else if (questionType === 1) {
            return (
                <div className='m-4'>
                    <h2 className="text-2xl mb-4">{question}</h2>
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
                    <button
                        className="mt-4 bg-blue-500 text-white w-1/3 p-2 rounded hover:bg-blue-600 mx-right"
                        onClick={handleNext}
                        disabled={!selection}
                    >
                        {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                    </button>
                </div>
            );
        } else if (questionType === 2) {
            return (
                <div className='m-4'>
                    <div className='mb-5 flex justify-between'>
                        <h2 className='underline text-l'>Question {questionNum + 1} of {quizInfo.length}</h2>
                        <div onMouseEnter={() => setShowinfo(true)} onMouseLeave={() => setShowinfo(false)}>
                            <InfoIcon />
                            {showInfo && (
                                <div className="absolute top right w-1/2 bg-gray-800 shadow-lg border border-colour-gray-900 text-sm rounded p-2">
                                    <p>Hint: Drag the items in the right hand column to answer the question</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <h2>{question}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <ul>
                                {answerList.slice(0, answerList.length / 2).map((answer) => (
                                    <li key={answer} className='border border-gray-300 rounded-md p-4 bg-gray-600 mt-3'>
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Reorder.Group axis="y" values={selectionList} onReorder={setSelectionList}>
                                {selectionList.map(selection => (
                                    <Reorder.Item value={selection}  key={selection}>
                                        <p className='cursor-pointer border border-gray-300 rounded-md p-4 bg-gray-600 hover:bg-gray-400 mt-3'>
                                            {selection}
                                        </p>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white w-1/3 p-2 rounded hover:bg-blue-600"
                            onClick={handleNext}
                            disabled={selectionList.length === 0}
                        >
                            {(questionNum < quizInfo.length - 1) ? 'Next' : 'Submit'}
                        </button>
                    </div>
                </div>
            );
        }
    };
    return renderQuestion();
};

export default Question;

