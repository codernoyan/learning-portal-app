import { useGetQuizQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import EditQuizInfo from './EditQuizInfo';

export default function EditQuizModal({ id }) {
  const [showModal, setShowModal] = useState(false);

  const {
    data: quiz, isLoading, isError, error,
  } = useGetQuizQuery(id);

  // let's decide what will be rendered
  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && Object.keys(quiz)?.length === 0) {
    content = <Error message="No quiz found!" />;
  } else if (!isLoading && !isError && Object.keys(quiz)?.length > 0) {
    content = <EditQuizInfo quiz={quiz} setShowModal={setShowModal} />;
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} type="button">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
      {showModal ? (
        content
      ) : null}
    </>
  );
}
