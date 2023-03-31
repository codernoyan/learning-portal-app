import { useGetAssigmentMarksByStudentIdQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarkQuery } from 'features/quizMark/quizMarkApi';

export default function RankedStudent({ user }) {
  const { id, name } = user || {};
  const {
    data: assignmentMarks, isLoading: assignmentMarkLoading, isError, error,
  } = useGetAssigmentMarksByStudentIdQuery(id);

  // get logged in student's quiz mark
  const { data: quizmarks, isLoading: quizMarkLoading } = useGetQuizMarkQuery({ id });

  // sum of assignment mark
  const sumOfAssignmentMark = assignmentMarks?.reduce((prev, curr) => prev + curr.mark, 0);
  const sumOfQuizMark = quizmarks?.reduce((prev, curr) => prev + curr.mark, 0);

  // total mark calculation
  let totalMark = 0;

  if (assignmentMarkLoading && quizMarkLoading) {
    totalMark = 'Loading';
  } else if (!assignmentMarkLoading && !quizMarkLoading) {
    totalMark = sumOfAssignmentMark + sumOfQuizMark;
  }

  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">4</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{quizMarkLoading ? 'Loading' : sumOfQuizMark}</td>
      <td className="table-td text-center">{assignmentMarkLoading ? 'Loading' : sumOfAssignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
