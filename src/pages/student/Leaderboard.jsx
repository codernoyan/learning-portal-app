/* eslint-disable no-plusplus */
import LoggedInStudent from 'components/student/leaderboard/LoggedInStudent';
import RankedStudents from 'components/student/leaderboard/RankedStudents';
import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { selectAuth } from 'features/auth/authSelector';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import { useSelector } from 'react-redux';

export default function Leaderboard() {
  // testing code
  const { user: { id } } = useSelector(selectAuth);
  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery();
  const { data: assignmentMarks } = useGetAssigmentMarksQuery();
  const { data: quizMarks, isLoading: quizLoading } = useGetQuizMarksQuery();

  // working code
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
    };
  });
  // console.log(newModifedArray);

  // provide same index number when mark is matched with others
  // let newIndex = 0;
  const gropuedArray = newModifedArray?.reduce((acc, current) => {
    const sum = current.totalQuizMark + current.totalAssignmentMark;
    if (!acc[sum]) {
      acc[sum] = [];
    }
    acc[sum].push(current);
    return acc;
  }, {});

  let info = null;
  let content = null;
  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && newModifedArray?.length === 0) {
    content = <tr><td>No student found!</td></tr>;
  } else if (!isLoading && !isError && newModifedArray?.length > 0) {
    // create a new array with new index
    let newIndex = 0;
    const newIndexedArray = Object.values(gropuedArray).reverse().map((group) => {
      const finalArray = group.map((obj) => {
        obj.index = newIndex;
        obj.totalMark = obj.totalQuizMark + obj.totalAssignmentMark;
        return obj;
      });
      newIndex++;
      return finalArray;
    }).flat();
    // content = newIndexedArray.slice(0, 20).map((user) => <RankedStudent key={user.id} user={user} />);
    info = newIndexedArray?.find((loggedInUser) => loggedInUser?.id === id);
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* logged in student position */}
        <LoggedInStudent info={info} />
        {/* top 20 students position */}
        <RankedStudents />
      </div>
    </section>
  );
}
