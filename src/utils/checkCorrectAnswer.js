// /* eslint-disable no-plusplus */
// export const checkCorrectAnswer = (relatedQuizzes, answers) => {
//   let correctAnswers = 0;
//   relatedQuizzes?.forEach((quiz) => {
//     const studentAnswers = answers[quiz.id] || [];
//     const correctOptions = quiz?.filter((option) => option?.isCorrect)?.map((option) => option?.id);
//     // check condition
//     if (studentAnswers?.length === correctOptions?.length && studentAnswers?.every((answer) => correctOptions?.includes(answer))) {
//       correctAnswers++;
//     }
//   });
//   return correctAnswers;
// };

// // export const checkIsCorrect = (quizData, answers) => {
// //   let rightAnswer = 0;
// //   const studentAnswers = answers[quiz.id] || [];
// // }

export const countRightAnswers = (relatedQuizData, answers) => {
  const rightCount = relatedQuizData?.options.reduce((count, option) => {
    const answer = answers?.find((ans) => ans.id === option.id);
    if (answer && answer?.isCorrect) {
      return count + 1;
    }
    return count;
  }, 0);

  return rightCount;
};

// Call the function with the provided data
// const correctCount = countCorrectAnswers(relatedQuizData, answers);
// console.log('Number of correct answers:', correctCount);
