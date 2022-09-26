import React from 'react';
import { nanoid } from 'nanoid';
import { FiChevronLeft } from 'react-icons/fi'

export default function Questions(props) {
  // checks correct answers if all questions are answered
  function checkAnswers() {
    Object.values(props.userAnswers).includes('')
      ? alert('Answer all the questions before checking')
      : props.setQuizFinished(true);
  }

  // creating question components
  const questionComponent = props.data.map((item, index) => {
    let classes = props.darkMode
      ? 'questions--question dark--mode'
      : 'questions--question';

    // creating question element
    const question = (
      <h2 className={classes}>
        {index + 1}. {item.question}
      </h2>
    );

    // creating answer elements
    const answers = item.allAnswers.map((answerEncrypted) => {
      const answer = atob(answerEncrypted);
      const name = `question${index + 1}`;
      let classes = props.darkMode
        ? 'questions--answer dark--mode'
        : 'questions--answer';
      if (props.quizFinished) {
        if (answer === item.correctAnswer) {
          classes += ' correct';
        } else if (answer === props.userAnswers[name]) {
          classes += ' wrong';
        }
      } else if (answer === props.userAnswers[name]) {
        classes += ' picked';
      }

      return (
        <label key={nanoid()} className={classes} htmlFor={answer}>
          {answer}
          <input
            type='radio'
            id={answer}
            name={name}
            onClick={props.handleClick}
          />
        </label>
      );
    });

    return (
      <div key={nanoid()} className='questions--question-component'>
        {question}
        <div className='questions--answers-container'>{answers}</div>
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
      You scored {correctAnswerCount}/{props.config.number} correct answers
    </div>
  );

  return (
    <div className='questions--body'>
      <button id='return--button'>
      <FiChevronLeft className={props.darkMode ? 'icon dark--mode' : 'icon'}
      onClick={props.returnToStart}/>
      </button>
      {questionComponent}
      <div className='result--container'>
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
