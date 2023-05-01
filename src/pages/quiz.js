import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import Questions from '../components/questions';

export default function Quiz({
  config,
  loading,
  setLoading,
  quizFinished,
  setQuizFinished,
  restartQuiz,
}) {
  const [triviaData, setTriviaData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const loadingScreen = <div className="loading">Loading...</div>;

  const notFullyAnswered = Object.values(userAnswers).includes('');

  /* Functions */

  // shuffles items in an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // sets answer as the picked answer in a question when clicked if quiz is not finished
  function pickAnswer(event) {
    const { name, id } = event.target;
    if (!quizFinished) {
      setUserAnswers((prev) => {
        return {
          ...prev,
          [name]: id.slice(id.indexOf('-') + 1),
        };
      });
    }
    return;
  }

  /* Effects */

  // fetches questions when config state is changed
  useEffect(() => {
    let url =
      config.difficulty === 'any'
        ? `https://opentdb.com/api.php?amount=${config.number}&type=multiple`
        : `https://opentdb.com/api.php?amount=${config.number}&difficulty=${config.difficulty}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTriviaData(() => {
          let triviaData = data.results.map((item, index) => {
            return {
              question: item.question,
              correctAnswer: item.correct_answer,
              allAnswers: data.results.map((item) => {
                return shuffle([
                  item.correct_answer,
                  ...item.incorrect_answers,
                ]);
              })[index],
            };
          });
          return triviaData;
        });
        setLoading(false);
      });
  }, [config, setLoading]);

  useEffect(() => {
    setUserAnswers(() => {
      let obj = {};
      for (let i = 1; i <= config.number; i++) {
        obj[`question${i}`] = '';
      }
      return obj;
    });
  }, [triviaData, config.number]);

  /* Results Logic */

  let correctAnswerCount = 0;

  const correctAnswers = triviaData.map((item) => decode(item.correctAnswer));

  correctAnswers.map((answer, index) => {
    return userAnswers[`question${index + 1}`] === answer
      ? correctAnswerCount++
      : null;
  });

  const result = (
    <div className="result">
      You scored {correctAnswerCount}/{config.number} correct answers
    </div>
  );

  return loading ? (
    loadingScreen
  ) : (
    <div className="quiz--body">
      <Questions
        triviaData={triviaData}
        userAnswers={userAnswers}
        pickAnswer={pickAnswer}
        quizFinished={quizFinished}
      />
      <div className="result--container">
        {quizFinished && result}
        <button
          className={`button transition ${notFullyAnswered ? 'disabled' : ''}`}
          disabled={notFullyAnswered}
          onClick={quizFinished ? restartQuiz : () => setQuizFinished(true)}
        >
          {quizFinished ? 'Play Again' : 'Check Answers'}
        </button>
      </div>
    </div>
  );
}
