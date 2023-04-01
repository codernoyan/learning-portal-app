import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import RankedStudent from './RankedStudent';

export default function RankedStudents() {
  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery();
  const { data: assignmentMarks } = useGetAssigmentMarksQuery();
  const { data: quizMarks } = useGetQuizMarksQuery();

  // testing code
  const newModifedArray = users?.map((user) => {
    const newAssignmentMarks = assignmentMarks?.filter((assignment) => assignment?.student_id === user?.id);
    const newQuizMarks = quizMarks?.filter((quiz) => quiz?.student_id === user?.id);
    // reduce marks
    const assignmentMark = newAssignmentMarks?.reduce((prev, curr) => prev + curr.mark, 0);
    const quizMark = newQuizMarks?.reduce((prev, curr) => prev + curr.mark, 0);

    // return a new array
    return {
      id: user?.id,
      name: user?.name,
      totalAssignmentMark: assignmentMark || 0,
      totalQuizMark: quizMark || 0,
      totalMark: assignmentMark || 0 + quizMark || 0,
    };
  });

  // sort ranking
  const sortByTotalMark = (a, b) => b.totalMark - a.totalMark;

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && newModifedArray?.length === 0) {
    content = <Error message="No videos found!" />;
  } else if (!isLoading && !isError && newModifedArray?.length > 0) {
    content = newModifedArray.sort(sortByTotalMark).map((user, index) => <RankedStudent key={user.id} user={user} index={index} />);
  }

  // console.log(newModifedArray);

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
        {content}
      </table>
    </div>
  );
}
