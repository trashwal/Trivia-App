import { useState, useEffect } from 'react';
import './App.css';
import Start from './components/start';
import Questions from './components/questions';
import { FiChevronLeft } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function App() {
  /* State Declarations */

  const [dark, setDark] = useState(false);
  const [config, setConfig] = useState({
    number: 5,
    difficulty: 'any',
    flip: false,
  });
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triviaData, setTriviaData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);

  /* Global Variables */

  const loadingScreen = <div className="loading">Loading...</div>;

  /* Main Functions */

  // shuffles items in an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    setStarted(true);
    setQuizFinished(false);
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
        setUserAnswers(() => {
          let obj = {};
          for (let i = 1; i <= config.number; i++) {
            obj[`question${i}`] = '';
          }
          return obj;
        });
        setLoading(false);
      });
  }, [config]);

  // loads app in dark mode if the last set theme was that
  useEffect(() => {
    const prefersDark = localStorage.getItem('darkMode');
    if (prefersDark === 'enabled') {
      setDark(true);
    }
  }, []);

  // applies css transitions after 1ms delay to prevent light mode styling flashing before dark mode styling
  useEffect(() => {
    setTimeout(() => {
      setFirstLoaded(true);
    }, 100);
  }, []);

  return (
    <main
      className={`main ${dark ? 'dark--mode' : ''} ${
        firstLoaded ? 'loaded' : ''
      }`}
    >
      <nav className="nav">
        {started && (
          <button
            id="return--button"
            className="nav--button"
            onClick={returnToStart}
          >
            <FiChevronLeft className="icon" />
          </button>
        )}
        <button
          id="dark--mode--button"
          className="nav--button"
          onClick={toggleDarkMode}
        >
          {dark ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </nav>
      {!started ? (
        <Start config={config} setConfig={setConfig} startQuiz={toggleQuiz} />
      ) : loading ? (
        loadingScreen
      ) : (
        <Questions
          config={config}
          triviaData={triviaData}
          userAnswers={userAnswers}
          pickAnswer={pickAnswer}
          quizFinished={quizFinished}
          setQuizFinished={setQuizFinished}
          restartQuiz={toggleQuiz}
        />
      )}
    </main>
  );
}
