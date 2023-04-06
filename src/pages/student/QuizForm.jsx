import { useGetQuizzesByVideoIdQuery } from 'features/quizzes/quizzesApi';
import { useParams } from 'react-router-dom';
import Error from 'ui/Error';
import Loading from 'ui/Loading';

/* eslint-disable react/no-unescaped-entities */
export default function QuizForm() {
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
    content = quizzes?.map(({ id, question, options }, index) => (
      <div key={id} className="quiz">
        <h4 className="question">
          Quiz
          {' '}
          { index + 1}
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
    ));
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
          </h1>
          <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
        </div>
        <div className="space-y-8 ">
          {content}
        </div>
        <button type="button" className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
      </div>
    </section>
  );
}
