/* eslint-disable no-plusplus */
import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import { indexedData, rankedData } from 'utils/leaderboardRankData';
import RankedStudent from './RankedStudent';

export default function RankedStudents() {
  const {
    data: users, isLoading, isError, error,
  } = useGetUsersQuery();
  const { data: assignmentMarks } = useGetAssigmentMarksQuery();
  const { data: quizMarks, isLoading: quizLoading } = useGetQuizMarksQuery();

  // // working code
  // const newModifedArray = users?.map((user) => {
  //   const newAssignmentMarks = assignmentMarks?.filter((assignment) => assignment?.student_id === user?.id);
  //   const newQuizMarks = quizMarks?.filter((quiz) => quiz?.student_id === user?.id);
  //   // reduce marks
  //   const assignmentMark = newAssignmentMarks?.reduce((prev, curr) => prev + curr.mark, 0);
  //   const quizMark = newQuizMarks?.reduce((prev, curr) => prev + curr.mark, 0);
  //   // return a new array
  //   return {
  //     id: user?.id,
  //     name: user?.name,
  //     totalAssignmentMark: assignmentMark || 0,
  //     totalQuizMark: quizMark || 0,
  //   };
  // });

  // // provide same index number when mark is matched with others
  // // let newIndex = 0;
  // const gropuedArray = newModifedArray?.reduce((acc, current) => {
  //   const sum = current.totalQuizMark + current.totalAssignmentMark;
  //   if (!acc[sum]) {
  //     acc[sum] = [];
  //   }
  //   acc[sum].push(current);
  //   return acc;
  // }, {});

  // new module system code tesing
  const gropuedArrayNew = rankedData(users, assignmentMarks, quizMarks);
  // testing code end

  let content = null;
  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length === 0) {
    content = <tr><td>No student found!</td></tr>;
  } else if (!isLoading && !isError && Object.keys(gropuedArrayNew)?.length > 0) {
    // create a new array with new index
    // let newIndex = 0;
    // const newIndexedArray = Object.values(gropuedArray).reverse().map((group) => {
    //   const finalArray = group.map((obj) => {
    //     obj.index = newIndex;
    //     obj.totalMark = obj.totalQuizMark + obj.totalAssignmentMark;
    //     return obj;
    //   });
    //   newIndex++;
    //   return finalArray;
    // }).flat();
    const indexedDataNew = indexedData(gropuedArrayNew);
    content = indexedDataNew.slice(0, 20).map((user) => <RankedStudent key={user.id} user={user} />);
    // console.log(Object.keys(gropuedArrayNew)?.length);
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
