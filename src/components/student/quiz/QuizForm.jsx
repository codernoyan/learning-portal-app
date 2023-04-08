import { selectAuth } from 'features/auth/authSelector';
import { useAddQuizMarkMutation } from 'features/quizMark/quizMarkApi';
import { useGetQuizzesByVideoIdQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateQuizScore } from 'utils/checkCorrectAnswer';

/* eslint-disable react/no-unescaped-entities */
export default function QuizForm() {
  const [addQuizMark] = useAddQuizMarkMutation();
  const { user } = useSelector(selectAuth);
  const { videoId } = useParams();
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  // get quiz data from server
  const {
    data: quizzes, isLoading, isError, error,
  } = useGetQuizzesByVideoIdQuery(videoId) || {};
  // use a function to count score and right or wrong count
  const quizScores = calculateQuizScore(quizzes, answers);
  // console.log(quizScores);

  const handleAddQuizMark = () => {
    const wrongCount = quizScores?.reduce((prev, curr) => prev + curr.wrongAnswerCount, 0);
    const correctCount = quizScores?.reduce((prev, curr) => prev + curr.score, 0);
    const rightCount = correctCount === 5 ? 1 : 2;
    const data = {
      student_id: user?.id,
      student_name: user?.name,
      video_id: Number(videoId),
      video_title: quizzes?.[0]?.video_title,
      totalQuiz: quizzes?.length,
      totalCorrect: rightCount,
      totalWrong: wrongCount,
      totalMark: correctCount,
      mark: 5,
    };
    // add quiz mark to server
    addQuizMark(data);
    navigate('/leaderboard');
  };

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {quizzes?.[0]?.video_title}
        </h1>
        <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
      </div>
      <div className="space-y-8 ">
        {
            quizzes?.map(({ id, question, options }, index) => (
              <div key={id} className="quiz mb-4">
                <h4 className="question">
                  Quiz
                  {' '}
                  {index + 1}
                  {' '}
                  -
                  {' '}
                  {question}
                </h4>
                <form className="quizOptions">
                  {
                    options?.map((option) => (
                      <label key={option?.id} htmlFor={`option${option?.id}_q${id}`}>
                        <input
                          type="checkbox"
                          id={`option${option?.id}_q${id}`}
                          onChange={() => {
                            const checkQuiz = answers?.find((answer) => answer.quizId === id && answer.optionId === option?.id);
                            // console.log(checkQuiz);
                            const quizOptionSelect = answers?.find((choice) => choice.optionId === option?.id);
                            console.log('check', !checkQuiz);
                            // condition
                            // if (checkQuiz) {
                            //   const toggledAnswer = answers.filter((answer) => answer.optionId !== option.id && answer.quizId === id);
                            //   setAnswers(toggledAnswer);
                            // } else if (checkQuiz) {
                            //   setAnswers([...answers, { quizId: id, optionId: option.id, isCorrect: option.isCorrect }]);
                            // } else if (!checkQuiz) {
                            //   setAnswers([...answers, { quizId: id, optionId: option.id, isCorrect: option.isCorrect }]);
                            // }
                            // condition
                            if (checkQuiz) {
                              const toggledAnswer = answers.filter((answer) => answer.id !== option.id && answer.quizId === id);
                              setAnswers(toggledAnswer);
                            } else if (!checkQuiz) {
                              setAnswers([...answers, { quizId: id, ...option }]);
                            }
                          }}
                        />
                        {option.option}
                      </label>
                    ))
                  }
                </form>
              </div>
            ))
          }
      </div>
      <button onClick={handleAddQuizMark} type="button" className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
    </div>
  );
}
