import React from 'react';
import './App.css';
import Start from './components/start';
import Questions from './components/questions';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function App() {
  const [dark, setDark] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [flip, setFlip] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [triviaData, setTriviaData] = React.useState([]);
  const [answers, setAnswers] = React.useState();
  const [userAnswers, setUserAnswers] = React.useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });
  const [quizFinished, setQuizFinished] = React.useState(false);

  function toggleDarkMode() {
    setDark((prev) => !prev);
  }

  function toggleQuiz() {
    setStarted(true);
    setFlip((prev) => !prev);
    setLoading(true);
    setQuizFinished(false);
    setUserAnswers({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
    });
  }

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=base64')
      .then((res) => res.json())
      .then((data) => {
        setTriviaData(data.results);
        setLoading(false);
      });
  }, [flip]);

  React.useEffect(() => {
    setAnswers(
      triviaData.map((item) => {
        return shuffle([item.correct_answer, ...item.incorrect_answers]);
      })
    );
  }, [triviaData]);

  const questionsData = triviaData.map((item, index) => {
    return {
      question: atob(item.question),
      correctAnswer: atob(item.correct_answer),
      allAnswers: answers[index],
    };
  });

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleClick(event) {
    const { name, id } = event.target;
    quizFinished
      ? setUserAnswers((prev) => prev)
      : setUserAnswers((prev) => {
          return {
            ...prev,
            [name]: id,
          };
        });
  }

  return (
    <main className={dark ? 'dark--mode' : null}>
      <button id="dark--mode" onClick={toggleDarkMode}>
        {dark ? (
          <MdLightMode className={dark ? 'icon dark--mode' : 'icon'} />
        ) : (
          <MdDarkMode className={dark ? 'icon dark--mode' : 'icon'} />
        )}
      </button>
      {!started ? (
        <Start darkMode={dark} startQuiz={toggleQuiz} />
      ) : loading ? (
        <div className={dark ? 'loading dark--mode' : 'loading'}>
          {' '}
          Loading...{' '}
        </div>
      ) : (
        <Questions
          darkMode={dark}
          data={questionsData}
          userAnswers={userAnswers}
          handleClick={handleClick}
          quizFinished={quizFinished}
          setQuizFinished={setQuizFinished}
          restartQuiz={toggleQuiz}
        />
      )}
    </main>
  );
}
