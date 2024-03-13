import React, { useState, useEffect } from "react";

const Question = ({quizInfo}) => {
    const [questionNum, setQuestionNum] = useState(0)
    const [selection , setSelection] = useState('')
    console.log(quizInfo[questionNum]["Question"])
    
    return (
        <div>
            <h2>hehee</h2>
        </div>
    )
  }
  
  export default Question