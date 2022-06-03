import React from "react";

export default function Start(props) {
    return (
        <div className="start--body">
            <h1 className="start--title">Trivia Quiz</h1>
            <h4 className="start--description">Press the button to generate 5 trivia questions</h4>
            <button className="button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}