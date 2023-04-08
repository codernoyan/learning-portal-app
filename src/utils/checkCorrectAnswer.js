/* eslint-disable no-lonely-if */
/* eslint-disable no-plusplus */
// /* eslint-disable no-plusplus */
// export const checkCorrectAnswer = (relatedQuizzes, answers) => {
//   let correctAnswers = 0;
//   relatedQuizzes?.forEach((quiz) => {
//     const studentAnswers = answers[quiz.id] || [];
//     const correctOptions = quiz?.options.filter((option) => option?.isCorrect)?.map((option) => option?.id);
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

// export const countRightAnswers = (relatedQuizData, answers) => {
//   const rightCount = relatedQuizData?.options.reduce((count, option) => {
//     const answer = answers?.find((ans) => ans.id === option.id);
//     if (answer && answer?.isCorrect) {
//       return count + 1;
//     }
//     return count;
//   }, 0);

//   return rightCount;
// };

// Call the function with the provided data
// const correctCount = countCorrectAnswers(relatedQuizData, answers);
// console.log('Number of correct answers:', correctCount);

// export const checkQuizAnswers = (quizData, answers) => quizData?.reduce((score, quiz) => {
//   const selectedAnswer = answers?.find((answer) => answer?.id === quiz?.id);
//   if (selectedAnswer && selectedAnswer.isCorrect) {
//     return score + 5;
//   }
//   return score;
// }, 0);

// export const checkQuizAnswers = (quizData, answers) => quizData?.reduce((score, quiz) => {
//   const selectedAnswer = answers?.find((answer) => answer?.quizId === quiz?.id && answer.isCorrect);
//   if (selectedAnswer) {
//     return score + 5;
//   }
//   return score;
// }, 0);

// // Call the function with the provided quiz data and answers
// const score = checkAnswers(relatedQuizData, answers);
// console.log('Score:', score); // Output: Score: 10 (if both answers are correct)

// export const checkQuizAnswers = (relatedQuizData, answers) => {
//   let score = 0;
//   let wrongAnswerCount = 0;

//   answers?.reduce((acc, answer) => {
//     const quizData = relatedQuizData?.find((q) => q?.id === answer?.quizId);
//     if (!quizData) {
//       return acc;
//     }

//     const option = quizData.options?.find((o) => o?.id === answer?.id);
//     if (!option) {
//       return acc;
//     }

//     if (option?.isCorrect && answer?.isCorrect) {
//       score += 5;
//     } else {
//       wrongAnswerCount++;
//     }

//     return acc;
//   }, {});

//   return { score, wrongAnswerCount };
// };

// Usage
// const result = checkQuizAnswers(relatedQuizData, answers);
// console.log('Score:', result.score);
// console.log('Wrong Answer Count:', result.wrongAnswerCount);

// export const checkQuizAnswers = (relatedQuizData, answers) => {
//   let score = 0;
//   let wrongAnswerCount = 0;

//   answers?.reduce((acc, answer) => {
//     const quizData = relatedQuizData?.find((q) => q?.id === answer?.quizId);
//     if (!quizData) {
//       return acc;
//     }

//     const option = quizData?.options?.find((o) => o?.id === answer?.id);
//     if (!option) {
//       return acc;
//     }

//     if (option?.isCorrect && answer?.isCorrect) {
//       score += 5;
//     } else {
//       wrongAnswerCount++;
//       quizData.rightAnswerCount = 0; // Set right answer count to 0 for wrong answer
//       score = 0; // Set score to 0 for wrong answer
//     }

//     return acc;
//   }, {});

//   return { score, wrongAnswerCount };
// };

// Usage
// const result = checkQuizAnswers(relatedQuizData, answers);
// console.log('Score:', result.score);
// console.log('Wrong Answer Count:', result.wrongAnswerCount);

// export const checkQuizAnswers = (relatedQuizData, answers) => {
//   let score = 0;
//   let wrongAnswerCount = 0;

//   // Create a shallow copy of the relatedQuizData array with rightAnswerCount property added
//   const quizDataCopy = relatedQuizData?.map((q) => ({ ...q, rightAnswerCount: 0 }));

//   answers?.reduce((acc, answer) => {
//     const quizData = quizDataCopy?.find((q) => q?.id === answer?.quizId);
//     if (!quizData) {
//       return acc;
//     }

//     const option = quizData?.options?.find((o) => o?.id === answer?.id);
//     if (!option) {
//       return acc;
//     }

//     if (option?.isCorrect && answer?.isCorrect) {
//       score += 5;
//       quizData.rightAnswerCount++; // Increment right answer count for correct answer
//     } else {
//       wrongAnswerCount++;
//       quizData.rightAnswerCount = 0; // Set right answer count to 0 for wrong answer
//       score = 0; // Set score to 0 for wrong answer
//     }

//     return acc;
//   }, {});

//   return { score, wrongAnswerCount };
// };

// Usage
// const result = checkQuizAnswers(relatedQuizData, answers);
// console.log('Score:', result.score);
// console.log('Wrong Answer Count:', result.wrongAnswerCount);

// export const checkQuizAnswers = (relatedQuizData, answers) => {
//   let score = 0;
//   let wrongAnswerCount = 0;

//   // Create a shallow copy of the relatedQuizData array with rightAnswerCount property added
//   const quizDataCopy = relatedQuizData?.map((q) => ({ ...q, rightAnswerCount: 0 }));

//   answers?.forEach((answer) => {
//     const quizData = quizDataCopy?.find((q) => q.id === answer.quizId);
//     if (quizData) {
//       const option = quizData?.options?.find((o) => o.id === answer.id);
//       if (option) {
//         if (option.isCorrect && answer.isCorrect) {
//           score += 5;
//           quizData.rightAnswerCount++; // Increment right answer count for correct answer
//         } else {
//           wrongAnswerCount++;
//           quizData.rightAnswerCount = 0; // Set right answer count to 0 for wrong answer
//           score = 0; // Set score to 0 for wrong answer
//         }
//       }
//     }
//   });

//   return { score, wrongAnswerCount };
// };

// Usage
// const result = checkQuizAnswers(relatedQuizData, answers);
// console.log('Score:', result.score);
// console.log('Wrong Answer Count:', result.wrongAnswerCount);

// export const checkQuizAnswers = (relatedQuizData, answers) => {
//   let score = 0;

//   // Create an object to store right answer count and wrong answer count for each quiz ID
//   const quizScoreMap = {};

//   relatedQuizData?.forEach((quizData) => {
//     quizScoreMap[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//   });

//   answers?.forEach((answer) => {
//     const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//     if (quizData) {
//       const option = quizData.options?.find((o) => o.id === answer.id);
//       if (option) {
//         if (option?.isCorrect && answer?.isCorrect) {
//           quizScoreMap[quizData.id].rightAnswerCount++; // Increment right answer count for correct answer
//         } else {
//           quizScoreMap[quizData.id].wrongAnswerCount++; // Increment wrong answer count for incorrect answer
//         }
//       }
//     }
//   });

//   // Calculate score based on right answer count and wrong answer count for each quiz ID
//   relatedQuizData?.forEach((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     if (rightAnswerCount === 0 && wrongAnswerCount > 0) {
//       // If all answers are incorrect for a quiz, set score to 0
//       score += 0;
//     } else {
//       // Otherwise, calculate score based on right answer count
//       score += rightAnswerCount * 5;
//     }
//   });

//   return score;
// };

// Usage
// const score = checkQuizAnswers(relatedQuizData, answers);
// console.log('Score:', score);
// --------working code-----------
// export const calculateQuizScore = (relatedQuizData, answers) => {
//   const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
//     acc[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//     return acc;
//   }, {});

//   answers?.forEach((answer) => {
//     const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//     if (quizData) {
//       const option = quizData.options?.find((o) => o.id === answer.id);
//       if (option) {
//         if (option.isCorrect && answer.isCorrect) {
//           quizScoreMap[quizData.id].rightAnswerCount++;
//         } else {
//           quizScoreMap[quizData.id].wrongAnswerCount++;
//         }
//       }
//     }
//   });

//   const quizScores = relatedQuizData?.map((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     const score = wrongAnswerCount > 0 ? 0 : rightAnswerCount;
//     return {
//       quizId: quizData.id,
//       score,
//     };
//   });

//   return quizScores;
// };

// const relatedQuizData = [
//   // Quiz data as provided in the question
// ];
// const answers = [
//   // Answers data as provided in the question
// ];
// -------working code----------
// const quizScores = calculateQuizScore(relatedQuizData, answers);
// console.log(quizScores);
// ------working code
// export const calculateQuizScore = (relatedQuizData, answers) => {
//   const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
//     acc[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//     return acc;
//   }, {});

//   answers?.forEach((answer) => {
//     const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//     if (quizData) {
//       const option = quizData.options?.find((o) => o.id === answer.id);
//       if (option) {
//         if (option.isCorrect && answer.isCorrect) {
//           quizScoreMap[quizData.id].rightAnswerCount++;
//         } else {
//           quizScoreMap[quizData.id].wrongAnswerCount++;
//         }
//       }
//     }
//   });

//   const quizScores = relatedQuizData?.map((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     const score = wrongAnswerCount > 0 ? 0 : 5 * rightAnswerCount;
//     return {
//       quizId: quizData.id,
//       score,
//       wrongAnswerCount,
//     };
//   });

//   return quizScores;
// };

// const relatedQuizData = [
//   // Quiz data as provided in the question
// ];
// const answers = [
//   // Answers data as provided in the question
// ];
// ----------working code
// -----working code with toggle
// export const calculateQuizScore = (relatedQuizData, answers) => {
//   const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
//     acc[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//     return acc;
//   }, {});

//   const processedAnswerIds = new Set(); // Keep track of processed answer IDs

//   answers?.forEach((answer) => {
//     // Check if answer ID is already processed
//     if (processedAnswerIds.has(answer.id)) {
//       // Reduce wrong answer count if answer ID is added twice
//       const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//       if (quizData) {
//         const option = quizData.options?.find((o) => o.id === answer.id);
//         if (option && !option.isCorrect) {
//           quizScoreMap[quizData.id].wrongAnswerCount--;
//         }
//       }
//     } else {
//       processedAnswerIds.add(answer.id);

//       const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//       if (quizData) {
//         const option = quizData.options?.find((o) => o.id === answer.id);
//         if (option) {
//           if (option.isCorrect && answer.isCorrect) {
//             quizScoreMap[quizData.id].rightAnswerCount++;
//           } else {
//             quizScoreMap[quizData.id].wrongAnswerCount++;
//           }
//         }
//       }
//     }
//   });

//   const quizScores = relatedQuizData?.map((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     const score = wrongAnswerCount > 0 ? 0 : 5 * rightAnswerCount;
//     return {
//       quizId: quizData.id,
//       score,
//       wrongAnswerCount,
//     };
//   });

//   return quizScores;
// };

// const relatedQuizData = [
//   // Quiz data as provided in the question
// ];

// const answers = [
//   // Answers data as provided in the question
// ];
// -------working code with toogle
// -------working code with toogle right and wrong
// export const calculateQuizScore = (relatedQuizData, answers) => {
//   const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
//     acc[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//     return acc;
//   }, {});

//   const processedAnswerIds = new Set(); // Keep track of processed answer IDs

//   answers?.forEach((answer) => {
//     // Check if answer ID is already processed
//     if (processedAnswerIds.has(answer.id)) {
//       const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//       if (quizData) {
//         const option = quizData.options?.find((o) => o.id === answer.id);
//         if (option && option.isCorrect && answer.isCorrect) {
//           // Toggle right answer count and score if right answer is clicked twice
//           quizScoreMap[quizData.id].rightAnswerCount--;
//         } else if (option && !option.isCorrect && !answer.isCorrect) {
//           // Toggle wrong answer count if wrong answer is clicked twice
//           quizScoreMap[quizData.id].wrongAnswerCount--;
//         }
//       }
//     } else {
//       processedAnswerIds.add(answer.id);

//       const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//       if (quizData) {
//         const option = quizData.options?.find((o) => o.id === answer.id);
//         if (option) {
//           if (option.isCorrect && answer.isCorrect) {
//             quizScoreMap[quizData.id].rightAnswerCount++;
//           } else {
//             quizScoreMap[quizData.id].wrongAnswerCount++;
//           }
//         }
//       }
//     }
//   });

//   const quizScores = relatedQuizData?.map((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     const score = wrongAnswerCount > 0 ? 0 : 5 * rightAnswerCount;
//     return {
//       quizId: quizData.id,
//       score,
//       wrongAnswerCount,
//     };
//   });

//   return quizScores;
// };
// export const calculateQuizScore = (relatedQuizData, answers) => {
//   const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
//     acc[quizData.id] = {
//       rightAnswerCount: 0,
//       wrongAnswerCount: 0,
//     };
//     return acc;
//   }, {});

//   answers?.forEach((answer) => {
//     const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
//     if (quizData) {
//       const option = quizData.options?.find((o) => o.id === answer.id);
//       if (option) {
//         if (option.isCorrect && answer.isCorrect) {
//           quizScoreMap[quizData.id].rightAnswerCount++;
//         } else {
//           quizScoreMap[quizData.id].wrongAnswerCount++;
//         }
//       }
//     }
//   });

//   const quizScores = relatedQuizData?.map((quizData) => {
//     const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
//     const score = Math.max(0, 5 * rightAnswerCount - wrongAnswerCount); // Prevent negative score
//     return {
//       quizId: quizData.id,
//       score,
//       wrongAnswerCount,
//     };
//   });

//   return quizScores;
// };
// finally working code found
export const calculateQuizScore = (relatedQuizData, answers) => {
  const quizScoreMap = relatedQuizData?.reduce((acc, quizData) => {
    acc[quizData.id] = {
      rightAnswerCount: 0,
      wrongAnswerCount: 0,
    };
    return acc;
  }, {});

  answers?.forEach((answer) => {
    const quizData = relatedQuizData?.find((q) => q.id === answer.quizId);
    if (quizData) {
      const option = quizData.options?.find((o) => o.id === answer.id);
      if (option) {
        if (option.isCorrect && answer.isCorrect) {
          quizScoreMap[quizData.id].rightAnswerCount++;
        } else {
          quizScoreMap[quizData.id].wrongAnswerCount++;
        }
      }
    }
  });

  const quizScores = relatedQuizData?.map((quizData) => {
    const { rightAnswerCount, wrongAnswerCount } = quizScoreMap[quizData.id];
    const score = wrongAnswerCount > 0 ? 0 : 5 * rightAnswerCount;
    return {
      quizId: quizData.id,
      score,
      wrongAnswerCount,
    };
  });

  return quizScores;
};
