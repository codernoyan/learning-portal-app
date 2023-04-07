import { useGetQuizzesByVideoIdQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import Question from './Question';

/* eslint-disable react/no-unescaped-entities */
export default function Questions() {
  const [quizData, setQuizData] = useState();
  const { videoId } = useParams();

  // get quiz data from server
  const {
    data: quizzes, isLoading, isError, error,
  } = useGetQuizzesByVideoIdQuery(videoId) || {};

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <Error message="No quiz found!" />;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((quiz, index) => <Question key={quiz.id} quiz={quiz} index={index} />);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {quizzes?.[0]?.video_title}
        </h1>
        <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
      </div>
      <div className="space-y-8 ">
        {/* <div className="quiz"> */}
        {/* <h4 className="question">
            Quiz
            {' '}
            {index + 1}
            {' '}
            -
            {' '}
            {question}
          </h4> */}
        {/* <form className="quizOptions"> */}
        {/* Option 1 */}
        {/* {
              quizzes?.map(({ id, options }) => (
                options.map((option) => (
                  <label key={option.id} htmlFor={`option${option?.id}_q${id}`}>
                    <input
                      type="checkbox"
                      id={`option${option?.id}_q${id}`}
                    />
                    {option.option}
                  </label>
                ))
              ))
            } */}
        {/* </form> */}
        {/* </div> */}
        <div className="quiz">
          <div>
            {
              quizzes?.map(({ question }) => (
                <h4 className="question">
                  {question}
                </h4>
              ))
            }
          </div>
          <form className="quizOptions">
            {/* Option 1 */}
            <label htmlFor="option1_q2">
              <input type="checkbox" id="option1_q2" />
              A search bar where the results are displayed as you type.
            </label>
            {/* Option 2 */}
            <label htmlFor="option2_q2">
              <input type="checkbox" id="option2_q2" />
              A button that performs an action when clicked.
            </label>
            {/* Option 3 */}
            <label htmlFor="option3_q2">
              <input type="checkbox" id="option3_q2" />
              An animation that plays when a user hovers over an element.
            </label>
            {/* Option 4 */}
            <label htmlFor="option4_q2">
              <input type="checkbox" id="option4_q2" />
              All of the above.
            </label>
          </form>
        </div>
      </div>
      {
        quizzes?.length !== 0 && !isLoading && <button type="submit" className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
      }
    </div>
  );
}
