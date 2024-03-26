import Container from '@mui/material/Container';
import React, { useState } from "react";
import { Reorder } from "framer-motion";

const Question = ({ quizInfo }) => {
    const [questionNum, setQuestionNum] = useState(0);
    const [selection, setSelection] = useState('');
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
        setSelection('');
        if (questionNum < quizInfo.length - 1) {
            setQuestionNum(questionNum + 1);
        }
    };

    const renderQuestion = () => {
        if (questionType === 0) {
            return (
                <div>
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
                <div>
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
                <div>
                    <h2>{question}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <ul>
                                {answerList.slice(0, answerList.length / 2).map((answer) => (
                                    <li key={answer} className='border border-gray-300 rounded-md p-4 bg-gray-600 hover:bg-gray-400 mt-3'>
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Reorder.Group axis="y" values={selectionList} onReorder={setSelectionList}>
                                {selectionList.map(selection => (
                                    <Reorder.Item value={selection}  key={selection}>
                                        <p className='border border-gray-300 rounded-md p-4 bg-gray-600 hover:bg-gray-400 mt-3'>
                                            {selection}
                                        </p>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white w-1/3 p-2 rounded hover:bg-blue-600 mx-right"
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

