import { useGetQuizQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';

export default function Question({ quiz, index }) {
  const { id, question, options } = quiz || {};
  const [answers, setAnswers] = useState([]);
  const { data: quizData } = useGetQuizQuery(id);
  // const dispatch = useDispatch();
  // const { answers } = useSelector((state) => state.quiz);
  // console.log(answers);

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
