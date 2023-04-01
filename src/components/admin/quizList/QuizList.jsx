import { useGetQuizzesQuery } from 'features/quizzes/quizzesApi';
import Quizitem from './QuizItem';

export default function QuizList() {
  const {
    data: quizzes, isLoading, isError, error,
  } = useGetQuizzesQuery();

  let content = null;
  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <tr><td>No Videos found!</td></tr>;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quiz, index) => <Quizitem key={quiz.id} quiz={quiz} index={index} />);
  }
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Question</th>
          <th className="table-th">Video</th>
          <th className="table-th justify-center">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50">
        {content}
      </tbody>
    </table>
  );
}
