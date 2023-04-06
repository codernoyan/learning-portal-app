import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import TableLoading from 'ui/TableLoading';
import { indexedData, rankedData } from 'utils/leaderboardRankData';
import RankedStudent from './RankedStudent';

export default function RankedStudents() {
  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery();
  const { data: assignmentMarks } = useGetAssigmentMarksQuery();
  const { data: quizMarks, isLoading: quizLoading } = useGetQuizMarksQuery();

  const gropuedArrayNew = rankedData(users, assignmentMarks, quizMarks);

  let content = null;
  if (isLoading) {
    content = <TableLoading />;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length === 0) {
    content = <tr><td>No student found!</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length > 0) {
    const indexedDataNew = indexedData(gropuedArrayNew);
    content = indexedDataNew.slice(0, 20).map((user) => <RankedStudent key={user.id} user={user} />);
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    </div>
  );
}
