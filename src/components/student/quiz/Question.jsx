import { useState } from 'react';

export default function Question({ quiz, index }) {
  const { id, question, options } = quiz || {};

  const [input, setInput] = useState([]);
  console.log(input);

  // find true
  const findCorrect = input.filter((option) => option.isCorrect);
  // console.log(findCorrect);

  // find false
  const findIncorrect = input.filter((option) => !option.isCorrect);
  // console.log(findIncorrect);

  return (
    <div className="quiz">
      <h4 className="question">
        Quiz
        {' '}
        {index + 1}
        {' '}
        -
        {' '}
        {question}
      </h4>
      <form className="quizOptions">
        {/* Option 1 */}
        {
          options.map((option) => (
            <label key={option.id} htmlFor={`option${option?.id}_q${id}`}>
              <input
                type="checkbox"
                id={`option${option?.id}_q${id}`}
              />
              {option.option}
            </label>
          ))
        }
      </form>
    </div>
  );
}
