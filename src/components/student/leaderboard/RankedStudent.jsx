export default function RankedStudent({ user, index }) {
  const {
    id, name, totalAssignmentMark, totalQuizMark, totalMark,
  } = user || {};
  // const {
  //   data: assignmentMarks, isLoading: assignmentMarkLoading, isError, error,
  // } = useGetAssigmentMarksByStudentIdQuery(id);

  // // get logged in student's quiz mark
  // const { data: quizmarks, isLoading: quizMarkLoading } = useGetQuizMarkQuery({ id });

  // // sum of assignment mark
  // const sumOfAssignmentMark = assignmentMarks?.reduce((prev, curr) => prev + curr.mark, 0);
  // const sumOfQuizMark = quizmarks?.reduce((prev, curr) => prev + curr.mark, 0);

  // total mark calculation
  // let totalMark = 0;

  // if (assignmentMarkLoading && quizMarkLoading) {
  //   totalMark = 'Loading';
  // } else if (!assignmentMarkLoading && !quizMarkLoading) {
  //   totalMark = sumOfAssignmentMark + sumOfQuizMark;
  // }

  return (
    <tbody>
      <tr className="border-b border-slate-600/50">
        <td className="table-td text-center">{index + 1}</td>
        <td className="table-td text-center">{name}</td>
        <td className="table-td text-center">{totalQuizMark}</td>
        <td className="table-td text-center">{totalAssignmentMark}</td>
        <td className="table-td text-center">{totalMark}</td>
      </tr>
    </tbody>
  );
}
