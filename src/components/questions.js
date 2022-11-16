import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function Questions(props) {
  // checks correct answers if all questions are answered
  function checkAnswers() {
    Object.values(props.userAnswers).includes('')
      ? alert('Answer all the questions before checking')
      : props.setQuizFinished(true);
  }

  // creating question components
  const questionComponent = props.triviaData.map((item, index) => {
    // creating question element
    const question = (
      <h2 className="questions--question">
        {index + 1}. {decode(item.question)}
      </h2>
    );

    // creating answer elements
    const answers = item.allAnswers.map((codedAnswer) => {
      const answer = decode(codedAnswer);
      const name = `question${index + 1}`;
      const id = `Q${index + 1}-${answer}`;
      let classes = 'questions--answer';

      if (props.quizFinished) {
        if (answer === decode(item.correctAnswer)) {
          classes += ' correct';
        } else if (answer === props.userAnswers[name]) {
          classes += ' wrong';
        }
      } else if (answer === props.userAnswers[name]) {
        classes += ' picked';
      }

      return (
        <label key={nanoid()} className={classes} htmlFor={id}>
          {answer}
          <input type="radio" id={id} name={name} onClick={props.pickAnswer} />
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

  console.log(props.userAnswers);

  const correctAnswers = props.triviaData.map((item) =>
    decode(item.correctAnswer)
  );

  let correctAnswerCount = 0;

  correctAnswers.map((answer, index) => {
    return props.userAnswers[`question${index + 1}`] === answer
      ? correctAnswerCount++
      : null;
  });

  const result = (
    <div className="result">
      You scored {correctAnswerCount}/{props.config.number} correct answers
    </div>
  );

  return (
    <div className="questions--body">
      {questionComponent}
      <div className="result--container">
        {props.quizFinished && result}
        <button
          className="button transition"
          onClick={props.quizFinished ? props.restartQuiz : checkAnswers}
        >
          {props.quizFinished ? 'Play Again' : 'Check Answers'}
        </button>
      </div>
    </div>
  );
}
