import React, { useState, useEffect } from "react";

const Question = ({quizInfo}) => {

    const [questionNum, setQuestionNum] = useState(0);
    const [selection , setSelection] = useState('');
    const question = quizInfo[questionNum].Question;
    const answerList = quizInfo[questionNum].Answers;
    const correctAns = quizInfo[questionNum].Answers[quizInfo[questionNum].correct];
    const questionType = quizInfo[questionNum].q_type;

    const handleNext  = () => {
        setSelection('')
        if (questionNum < quizInfo.length -1){
            setQuestionNum(questionNum + 1)
        }
    }
    if (questionType == 0){
        return (
            <div>
                <h2 className="text-2xl mb-4">{question}</h2>
                <div className="grid grid-cols-1 gap-4">
                    {answerList.map((answer) => (
                        <button
                            key={answer}
                            className={`border border-gray-300 rounded-md p-4 ${selection === answer ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-600 hover:bg-gray-400'}`}
                            onClick={() => setSelection(answer)}>
                            {answer}
                        </button>
                    ))}
                    <button
                        className="mt-4 bg-blue-500 text-white p-2 w-1/3 rounded hover:bg-blue-600 mx-auto"
                        onClick= {() => handleNext()}
                        disabled={!selection}
                    >
                        {(questionNum < quizInfo.length -1) ? 'Next' : 'Submit'}
                    </button>


                </div>                   
            </div>
        )
        } else if (questionType == 1){
            return (
                <div>
                    <h2 className="text-2xl mb-4 ">{question}</h2>
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
                        className="mt-4 bg-blue-500 text-white w-1\3 p-2 rounded hover:bg-blue-600 mx-auto"
                        onClick= {() => handleNext()}
                        disabled={!selection}
                    >
                        {(questionNum < quizInfo.length -1) ? 'Next' : 'Submit'}
                    </button>     
                </div>
            )
        }

  }
  
  export default Question


