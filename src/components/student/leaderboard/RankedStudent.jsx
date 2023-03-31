import { useGetAssigmentMarksByStudentIdQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { selectAuth } from 'features/auth/authSelector';
import { useGetQuizMarkQuery } from 'features/quizMark/quizMarkApi';
import { useSelector } from 'react-redux';

export default function RankedStudent() {
  // get logged in student's info
  const { user: { id, name } } = useSelector(selectAuth) || {};

  // get logged in student's assignment mark
  const {
    data: assignmentMarks, isLoading: assignmentMarkLoading, isError, error,
  } = useGetAssigmentMarksByStudentIdQuery(id);

  // get logged in student's quiz mark
  const { data: quizmarks, isLoading: quizMarkLoading } = useGetQuizMarkQuery(id);

  // sum of assignment mark
  const sumOfAssignmentMark = assignmentMarks?.reduce((prev, curr) => prev + curr.totalMark, 0);
  const sumOfQuizMark = quizmarks?.reduce((prev, curr) => prev + curr.totalMark, 0);

  // total mark calculation
  let totalMark = 0;

  if (assignmentMarkLoading && quizMarkLoading) {
    totalMark = 'Loading';
  } else if (!assignmentMarkLoading && !quizMarkLoading) {
    totalMark = sumOfAssignmentMark + sumOfQuizMark;
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
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">4</td>
            <td className="table-td text-center font-bold">{name}</td>
            <td className="table-td text-center font-bold">{quizMarkLoading ? 'Loading' : sumOfQuizMark}</td>
            <td className="table-td text-center font-bold">{assignmentMarkLoading ? 'Loading' : sumOfAssignmentMark}</td>
            <td className="table-td text-center font-bold">{totalMark}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
