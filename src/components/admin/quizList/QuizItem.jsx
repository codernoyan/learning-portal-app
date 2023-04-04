import { useDeleteQuizMutation } from 'features/quizzes/quizzesApi';
import EditQuizModal from '../editQuiz/EditQuizModal';

/* eslint-disable camelcase */
export default function Quizitem({ quiz, index }) {
  const { id, question, video_title } = quiz || {};
  const [deleteQuiz, { isLoading, isError, error }] = useDeleteQuizMutation();
  // delete quiz
  const handleDeleteQuiz = () => {
    deleteQuiz(id);
  };

  return (
    <tr>
      <td className="table-td">
        Quiz
        {' '}
        {index + 1}
        {' '}
        -
        {' '}
        {question}
      </td>
      <td className="table-td">{`${video_title.slice(0, 40)}...`}</td>
      <td className="flex justify-center gap-x-2 text-gray-400">
        {/* delete button */}
        <button onClick={handleDeleteQuiz} type="button">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
        {/* edit button */}
        <EditQuizModal id={id} />
      </td>
    </tr>
  );
}
