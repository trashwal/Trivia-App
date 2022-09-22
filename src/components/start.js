import React from 'react';

export default function Start(props) {
  return (
    <div className="start--body">
      <h1
        className={props.darkMode ? 'start--title dark--mode' : 'start--title'}
      >
        Trivia Quiz
      </h1>
      <h4
        className={
          props.darkMode
            ? 'start--description dark--mode'
            : 'start--description'
        }
      >
        Press the button to generate 5 trivia questions
      </h4>
      <button
        className={props.darkMode ? 'button dark--mode' : 'button'}
        onClick={props.startQuiz}
      >
        Start quiz
      </button>
    </div>
  );
}
