/* eslint-disable no-plusplus */
export const rankedData = (users, assignmentMarks, quizMarks) => {
  // maping over existed data and create a new array
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
  // create a new gropued array for provide same index for same mark
  const gropuedArray = newModifedArray?.reduce((acc, current) => {
    const sum = current.totalQuizMark + current.totalAssignmentMark;
    if (!acc[sum]) {
      acc[sum] = [];
    }
    acc[sum].push(current);
    return acc;
  }, {});
  return gropuedArray;
};

export const indexedData = (gropuedArray) => {
  // create a new array with new index
  let newIndex = 1;
  const newIndexedArray = Object?.values(gropuedArray)?.reverse()?.map((group) => {
    const finalArray = group?.map((obj) => {
      obj.index = newIndex;
      obj.totalMark = obj.totalQuizMark + obj.totalAssignmentMark;
      return obj;
    });
    // icrease index number if new mark found
    newIndex++;
    return finalArray;
  }).flat();
  return newIndexedArray;
};
