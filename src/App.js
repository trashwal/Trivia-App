import React from 'react';
import './App.css';
import Start from './components/start';
import Questions from './components/questions';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function App() {
  /* State Declarations */

  const [dark, setDark] = React.useState(false);
  const [config, setConfig] = React.useState({
    number: 5,
    difficulty: 'any',
    flip: false,
  });
  const [started, setStarted] = React.useState(false);
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
  const [firstLoaded, setFirstLoaded] = React.useState(false);

  /* Global Variables */

  const loadingScreen = <div className="loading">Loading...</div>;

  /* Effects */

  // fetches questions when config state is changed
  React.useEffect(() => {
    let url =
      config.difficulty === 'any'
        ? `https://opentdb.com/api.php?amount=${config.number}&type=multiple&encode=base64`
        : `https://opentdb.com/api.php?amount=${config.number}&difficulty=${config.difficulty}&type=multiple&encode=base64`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTriviaData(data.results);
        setAnswers(
          data.results.map((item) => {
            return shuffle([item.correct_answer, ...item.incorrect_answers]);
          })
        );
        setLoading(false);
      });
  }, [config]);

  // loads component in dark mode if the last set theme was that
  React.useEffect(() => {
    const prefersDark = localStorage.getItem('darkMode');
    if (prefersDark === 'enabled') {
      setDark(true);
    }
  }, []);

  // applies transitions after start component is loaded to prevent light mode styling flashing before dark mode styling
  React.useEffect(() => {
    setTimeout(() => {
      setFirstLoaded(true);
    }, 100);
  }, []);

  /* Main Functions */

  // shuffles items in an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // reset user's answers
  function resetAnswers() {
    setUserAnswers({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
    });
  }

  // toggles dark mode
  function toggleDarkMode() {
    if (dark) {
      setDark(false);
      localStorage.setItem('darkMode', 'disabled');
    } else {
      setDark(true);
      localStorage.setItem('darkMode', 'enabled');
    }
  }

  // returns to start page
  function returnToStart() {
    setStarted(false);
    setQuizFinished(false);
  }

  // starts or restarts quiz
  function toggleQuiz() {
    setLoading(true);
    setConfig({
      ...config,
      flip: !config.flip,
    });
    resetAnswers();
    setStarted(true);
    setQuizFinished(false);
  }

  // sets answer as the picked answer in a question when clicked if quiz is not finished
  function handleClick(event) {
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

  // maps through fetched data and fills question and answers in object
  let questionsData = triviaData.map((item, index) => {
    return {
      question: atob(item.question),
      correctAnswer: atob(item.correct_answer),
      allAnswers: answers[index],
    };
  });

  return (
    <main
      className={`main ${dark ? 'dark--mode' : ''} ${
        firstLoaded ? 'loaded' : ''
      }`}
    >
      <button
        id="dark--mode--button"
        className="secondary--button"
        onClick={toggleDarkMode}
      >
        {dark ? (
          <MdLightMode className="icon" />
        ) : (
          <MdDarkMode className="icon" />
        )}
      </button>
      {!started ? (
        <Start config={config} setConfig={setConfig} startQuiz={toggleQuiz} />
      ) : loading ? (
        loadingScreen
      ) : (
        <Questions
          returnToStart={returnToStart}
          config={config}
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
