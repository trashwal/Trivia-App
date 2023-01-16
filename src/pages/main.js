import Config from '../components/config';

export default function Main({ config, setConfig, startQuiz }) {
  return (
    <div className="main--body">
      <h1 className="main--title">Trivia Quiz</h1>
      <h4 className="main--description">
        Press the button to generate trivia questions
      </h4>
      <Config config={config} setConfig={setConfig} />
      <button className="button" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
