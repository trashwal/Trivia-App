import React from 'react';
import { nanoid } from 'nanoid';

export default function Questions(props) {
  function checkAnswers() {
    Object.values(props.userAnswers).includes('')
      ? alert('Answer all the questions before checking')
      : props.setQuizFinished(true);
  }

  const questionComponent = props.data.map((item, index) => {
    let classes = props.darkMode
      ? 'questions--question dark--mode'
      : 'questions--question';
    const question = (
      <h2 className={classes}>
        {index + 1}. {item.question}
      </h2>
    );

    const answers = item.allAnswers.map((answer) => {
      const answerDecoded = atob(answer);
      const name = `question${index + 1}`;
      let classes = props.darkMode
        ? 'questions--answer dark--mode'
        : 'questions--answer';
      if (props.quizFinished) {
        if (answerDecoded === item.correctAnswer) {
          classes += ' correct';
        } else if (answerDecoded === props.userAnswers[name]) {
          classes += ' wrong';
        }
      } else if (answerDecoded === props.userAnswers[name]) {
        classes += ' picked';
      }

      return (
        <label key={nanoid()} className={classes} htmlFor={answerDecoded}>
          {answerDecoded}
          <input
            type="radio"
            id={answerDecoded}
            name={name}
            onClick={props.handleClick}
          />
        </label>
      );
    });

    return (
      <div key={nanoid()} className="questions--question-component">
        {question}
        <div className="questions--answers-container">{answers}</div>
      </div>
    );
  });

  const correctAnswers = props.data.map((item) => item.correctAnswer);

  let correctAnswerCount = 0;

  correctAnswers.map((answer, index) => {
    return answer === props.userAnswers[`question${index + 1}`]
      ? correctAnswerCount++
      : null;
  });

  const result = (
    <div className={props.darkMode ? 'result dark--mode' : 'result'}>
      You scored {correctAnswerCount}/5 correct answers
    </div>
  );

  return (
    <div className="questions--body">
      {questionComponent}
      <div className="result--container">
        {props.quizFinished && result}
        <button
          className={props.darkMode ? 'button dark--mode' : 'button'}
          onClick={props.quizFinished ? props.restartQuiz : checkAnswers}
        >
          {props.quizFinished ? 'Play Again' : 'Check Answers'}
        </button>
      </div>
    </div>
  );
}
