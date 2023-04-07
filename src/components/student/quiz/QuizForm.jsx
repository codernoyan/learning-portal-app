import { useGetQuizzesByVideoIdQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

/* eslint-disable react/no-unescaped-entities */
export default function QuizForm() {
  // const [quizData, setQuizData] = useState();
  const { videoId } = useParams();
  const [answers, setAnswers] = useState();
  // get quiz data from server
  const {
    data: quizzes, isLoading, isError, error,
  } = useGetQuizzesByVideoIdQuery(videoId) || {};
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {quizzes?.[0]?.video_title}
        </h1>
        <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
      </div>
      <div className="space-y-8 ">
        <form>
          {
            quizzes?.map(({ id, question, options }, index) => (
              <div className="quiz mb-4">
                <h4 className="question">
                  Quiz
                  {' '}
                  {index + 1}
                  {' '}
                  -
                  {' '}
                  {question}
                </h4>
                <div className="quizOptions">
                  {/* Option 1 */}
                  {
                    options?.map((option) => (
                      <label key={option.id} htmlFor={`option${option?.id}_q${id}`}>
                        <input
                          type="checkbox"
                          id={`option${option?.id}_q${id}`}
                        />
                        {option.option}
                      </label>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </form>
      </div>
      <button type="button" className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
    </div>
  );
}
