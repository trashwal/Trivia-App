export default function Config({ config, setConfig }) {
  return (
    <div id="configuration">
      <div id="config--number">
        <label htmlFor="number" className="config--label">
          Number of questions:{' '}
        </label>
        <select
          onChange={(e) => {
            setConfig({
              ...config,
              number: parseInt(e.target.value),
            });
          }}
          defaultValue={config.number}
          id="number"
          className="config--select"
        >
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div id="config--difficulty">
        <label htmlFor="difficulty" className="config--label">
          Difficulty of questions:{' '}
        </label>
        <select
          onChange={(e) => {
            setConfig({ ...config, difficulty: e.target.value });
          }}
          defaultValue={config.difficulty}
          id="difficulty"
          className="config--select"
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}
