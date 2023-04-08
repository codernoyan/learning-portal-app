/* eslint-disable no-plusplus */
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
