import React from "react";
import { nanoid } from "nanoid";

export default function Questions(props) {
        
    function checkAnswers() {
        Object.values(props.userAnswers).includes("") ?
        alert("Try to answer all the questions before checking the right ones.") :
        props.setQuizFinished(true)
    }

    const questionComponent = props.data.map((item, index) => {
        const question = <h2 className="questions--question">{index + 1}. {item.question}</h2>

        const answers = item.allAnswers.map(answer => {
            const answerDecoded = atob(answer)
            const name = `question${index + 1}`
            let className = "questions--answer"
            if (props.quizFinished) {
                if (answerDecoded === item.correctAnswer) {
                    className = "questions--answer correct"
                } else if (answerDecoded === props.userAnswers[name]) {
                    className = "questions--answer wrong"
                }
            } else if (answerDecoded === props.userAnswers[name]) {
                className = "questions--answer picked"
            }

            return (
            <label key={nanoid()} className={className} htmlFor={answerDecoded}>
                {answerDecoded}
                <input
                    type="radio"
                    id={answerDecoded}
                    name={name}
                    onClick={props.handleClick}
                />
            </label>)
        })

        return (
            <div key={nanoid()} className="questions--questionComponent">
                {question}
                <div className="questions--answerContainer">
                    {answers}
                </div>
            </div>
        )
    })
    
    const correctAnswers = props.data.map(item => item.correctAnswer)

    let correctAnswerCount = 0
    
    correctAnswers.map((answer, index) => {
        return (answer === props.userAnswers[`question${index + 1}`] ? correctAnswerCount++ : null)
    })

    const result = <div className="result">You scored {correctAnswerCount}/5 correct answers</div>
    
    return (
        <div className="questions--body">
            {questionComponent}
            <div className="result--container">
                {props.quizFinished && result}
                <button className="button" onClick={props.quizFinished ? props.restartQuiz : checkAnswers}>
                    {props.quizFinished ? "Play Again" : "Check Answers"}
                </button>
            </div>
        </div>
    )
}