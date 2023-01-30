import Config from '../components/config';

export default function Start({ config, setConfig, startQuiz }) {
  return (
    <div className="start--body">
      <h1 className="start--title">Trivia Quiz</h1>
      <h4 className="start--description">
        Press the button to generate trivia questions
      </h4>
      <Config config={config} setConfig={setConfig} />
      <button className="button" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
