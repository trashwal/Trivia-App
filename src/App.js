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
