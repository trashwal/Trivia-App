import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

export default function Questions({
  triviaData,
  userAnswers,
  pickAnswer,
  quizFinished,
}) {
  // creating question component
  const questionComponent = triviaData.map((item, index) => {
    // creating question elements
    const question = (
      <h2 className="quiz--question">
        {index + 1}. {decode(item.question)}
      </h2>
    );

    const answers = item.allAnswers.map((codedAnswer) => {
      const answer = decode(codedAnswer);
      const name = `question${index + 1}`;
      const id = `Q${index + 1}-${answer}`;
      let classes = 'quiz--answer';

      if (quizFinished) {
        if (answer === userAnswers[name]) {
          classes += ' picked';
        }
        if (answer === decode(item.correctAnswer)) {
          classes += ' correct';
        } else if (answer === userAnswers[name]) {
          classes += ' wrong';
        }
      } else if (answer === userAnswers[name]) {
        classes += ' picked';
      }

      return (
        <label key={nanoid()} className={classes} htmlFor={id}>
          {answer}
          <input type="radio" id={id} name={name} onClick={pickAnswer} />
        </label>
      );
    });

    return (
      <div key={nanoid()} className="quiz--question-component">
        {question}
        <div className="quiz--answers-container">{answers}</div>
      </div>
    );
  });

  return <>{questionComponent}</>;
}
