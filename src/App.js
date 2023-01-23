import { useState, useEffect } from 'react';
import './App.css';
import Main from './pages/main';
import Quiz from './pages/quiz';
import Nav from './components/nav';

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
  const [quizFinished, setQuizFinished] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);

  /* Main Functions */

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

  /* Effects */

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
      className={`app ${dark ? 'dark--mode' : ''} ${
        firstLoaded ? 'loaded' : ''
      }`}
    >
      <svg className="blobs blob-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M 61 -66 C 95 -70 94 -32 84 -17 C 73 -2 57 11 50 27 C 43 44 33.6 57.3 20.4 66.7 C 7.2 76.1 -11.8 80.3 -32 77 C -53 71 -48 47 -48 34 C -49 18 -48 7 -49 -4 C -49 -14 -50 -26 -49 -64 C -14 -71 -7 -68 5 -68 c 22 1 37 2.4 56 2 Z" />
      </svg>
      <svg className="blobs blob-2" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 52 -66 C 65 -56 68 -32 64 -9 C 63 8 63 16 60 63 C 50 70 27 72 10 74 C -1 75 -9 76 -27 77 C -65 81 -81 65 -80 46 C -80 29 -71.7 8.1 -62 -4.7 C -52.3 -17.6 -38.5 -23.5 -27.5 -33.8 C -16.4 -44.2 -8.2 -59 6.6 -66.8 C 21.3 -74.6 42.7 -75.4 52 -66 Z"
        />
      </svg>
      <Nav
        started={started}
        setStarted={setStarted}
        setQuizFinished={setQuizFinished}
        dark={dark}
        setDark={setDark}
      />
      {!started ? (
        <Main config={config} setConfig={setConfig} startQuiz={toggleQuiz} />
      ) : (
        <Quiz
          config={config}
          loading={loading}
          setLoading={setLoading}
          quizFinished={quizFinished}
          setQuizFinished={setQuizFinished}
          restartQuiz={toggleQuiz}
        />
      )}
    </main>
  );
}
