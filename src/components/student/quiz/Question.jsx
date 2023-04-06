import { useGetQuizQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import { countRightAnswers } from 'utils/checkCorrectAnswer';

export default function Question({ quiz, index }) {
  const { id, question, options } = quiz || {};
  const [answers, setAnswers] = useState([]);
  const { data: quizData } = useGetQuizQuery(id);

  const rightAnswerCount = countRightAnswers(quizData, answers);
  console.log(rightAnswerCount);

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
                onChange={() => setAnswers((prev) => [...prev, {
                  id: option.id, option: option.option, isCorrect: option.isCorrect,
                }])}
              />
              {option.option}
            </label>
          ))
        }
      </form>
    </div>
  );
}
