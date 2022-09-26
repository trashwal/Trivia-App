import React from 'react';

export default function Start(props) {
  return (
    <div className='start--body'>
      <h1
        className={props.darkMode ? 'start--title dark--mode' : 'start--title'}
      >
        Trivia Quiz
      </h1>
      <h4
        className={
          props.darkMode
            ? 'start--description dark--mode'
            : 'start--description'
        }
      >
        Press the button to generate trivia questions
      </h4>
      <div id='start--configuration'>
        <div id='config--number'>
          <label
            htmlFor='number'
            className={props.darkMode ? 'dark--mode' : null}
          >
            Number of questions:{' '}
          </label>
          <select
            onChange={(e) => {
              props.setConfig({
                ...props.config,
                number: parseInt(e.target.value),
              });
            }}
            defaultValue={props.config.number}
            id='number'
            className={props.darkMode ? 'dark--mode' : null}
          >
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </div>
        <div id='config--difficulty'>
          <label
            htmlFor='number'
            className={props.darkMode ? 'dark--mode' : null}
          >
            Difficulty of questions:{' '}
          </label>
          <select
            onChange={(e) => {
              props.setConfig({ ...props.config, difficulty: e.target.value });
            }}
            defaultValue={props.config.difficulty}
            id='number'
            className={props.darkMode ? 'dark--mode' : null}
          >
            <option value='any'>Any</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      </div>
      <button
        className={props.darkMode ? 'button dark--mode' : 'button'}
        onClick={props.startQuiz}
      >
        Start quiz
      </button>
    </div>
  );
}
