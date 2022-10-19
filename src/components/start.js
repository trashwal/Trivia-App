import React from 'react';

export default function Start(props) {
  
  return (
    <div className='start--body'>
      <h1 className='start--title'>
        Trivia Quiz
      </h1>
      <h4 className='start--description'>
        Press the button to generate trivia questions
      </h4>
      <div id='start--configuration'>
        <div id='config--number'>
          <label htmlFor='number' className='config--label'>
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
            className='config--select'
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
          <label htmlFor='difficulty' className='config--label'>
            Difficulty of questions:{' '}
          </label>
          <select
            onChange={(e) => {
              props.setConfig({ ...props.config, difficulty: e.target.value });
            }}
            defaultValue={props.config.difficulty}
            id='difficulty'
            className='config--select'
          >
            <option value='any'>Any</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      </div>
      <button
        className='button'
        onClick={props.startQuiz}
      >
        Start quiz
      </button>
    </div>
  );
}
