import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { selectAuth } from 'features/auth/authSelector';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import { useSelector } from 'react-redux';
import TableLoading from 'ui/TableLoading';
import { indexedData, rankedData } from 'utils/leaderboardRankData';
import LoggedInStudentRank from './LoggedInStudentRank';

export default function LoggedInStudent() {
  // get logged in student's info
  const { user: { id, name } } = useSelector(selectAuth) || {};
  // testing code
  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery();
  const { data: assignmentMarksNew } = useGetAssigmentMarksQuery();
  const { data: quizMarksNew, isLoading: quizLoading } = useGetQuizMarksQuery();

  const gropuedArrayNew = rankedData(users, assignmentMarksNew, quizMarksNew);
  let content = null;
  if (isLoading) {
    content = <TableLoading />;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length === 0) {
    content = <tr><td>No student found!</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length > 0) {
    const indexedDataNew = indexedData(gropuedArrayNew);
    const loggedInStudentData = indexedDataNew?.find((user) => user?.id === id);
    content = <LoggedInStudentRank loggedInStudentData={loggedInStudentData} />;
  }

  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{index}</td>
            <td className="table-td text-center font-bold">{name}</td>
            <td className="table-td text-center font-bold">{quizMarkLoading ? 'Loading' : sumOfQuizMark}</td>
            <td className="table-td text-center font-bold">{assignmentMarkLoading ? 'Loading' : sumOfAssignmentMark}</td>
            <td className="table-td text-center font-bold">{totalMark}</td>
          </tr> */}
          {content}
        </tbody>
      </table>
    </div>
  );
}
