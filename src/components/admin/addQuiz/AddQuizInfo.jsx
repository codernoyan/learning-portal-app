/* eslint-disable no-alert */
import { useAddQuizMutation } from 'features/quizzes/quizzesApi';
import { useGetVideosQuery } from 'features/videos/videosApi';
import { useState } from 'react';

export default function AddQuizInfo({ setShowModal }) {
  const [addQuiz, { isLoading, isError, error }] = useAddQuizMutation();
  const { data: videos } = useGetVideosQuery();
  // quiz info state
  const [input, setInput] = useState({
    question: '',
    video_title: '',
  });
  // options array of objects
  const [optionOne, setOptionOne] = useState({
    id: 1,
    option: '',
    isCorrect: false,
  });
  const [optionTwo, setOptionTwo] = useState({
    id: 2,
    option: '',
    isCorrect: false,
  });
  const [optionThree, setOptionThree] = useState({
    id: 3,
    option: '',
    isCorrect: false,
  });
  const [optionFour, setOptionFour] = useState({
    id: 4,
    option: '',
    isCorrect: false,
  });

  // add a quiz
  const handleAddQuiz = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to add it?');
    if (confirmation) {
      const data = {
        question: input.question,
        video_id: JSON.parse(input.video_title).id,
        video_title: JSON.parse(input.video_title).title,
        options: [
          optionOne,
          optionTwo,
          optionThree,
          optionFour,
        ],
      };
      addQuiz(data);
    } else {
      return;
    }
    setShowModal(false);
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm"
      >
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-900 outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-900 rounded-t">
              <h3 className="text-2xl font-semibold text-white">
                Add
                {' '}
                <span className="text-cyan-500">Quiz</span>
              </h3>
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <form onSubmit={handleAddQuiz}>
              <div className="relative px-6 py-1 flex-auto">
                {/* quiz quiestion */}
                <div className="flex flex-col gap-1 mb-1">
                  <label htmlFor="quiz" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Quiz Question</label>
                  <input onChange={(e) => setInput({ ...input, question: e.target.value })} value={input.question} id="quiz" type="text" name="title" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: What is the differences between null and undefinded" required />
                </div>
                {/* video title */}
                <div className="flex flex-col gap-1 flex-grow">
                  <label htmlFor="video_title" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Video Title</label>
                  <select
                    onChange={(e) => setInput({ ...input, video_title: e.target.value })}
                    value={input.video_title}
                    name="video"
                    id="video_title"
                    className="border border-black p-2 bg-slate-700 text-white"
                  >
                    <option hidden defaultValue>Select a video</option>
                    {
                      videos?.map((video) => <option key={video?.id} value={JSON.stringify(video)}>{video?.title}</option>)
                    }
                  </select>
                </div>
                {/* option one */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="one" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Option One</label>
                  <div className="flex gap-4 items-center">
                    <input
                      onChange={(e) => setOptionOne({ ...optionOne, option: e.target.value })}
                      value={optionOne.option}
                      id="one"
                      type="text"
                      name="one"
                      className="border border-black p-2 bg-slate-700 text-white flex-grow"
                      placeholder="Ex: 44.26"
                      required
                    />
                    <input
                      onChange={(e) => setOptionOne({ ...optionOne, isCorrect: e.target.checked })}
                      value={optionOne.isCorrect}
                      type="checkbox"
                      name="answer"
                      id="answer"
                      className="accent-cyan-300 focus:accent-cyan-500 w-6 h-6 cursor-pointer"
                    />
                  </div>
                </div>
                {/* option two */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="two" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Option Two</label>
                  <div className="flex gap-4 items-center">
                    <input
                      onChange={(e) => setOptionTwo({ ...optionTwo, option: e.target.value })}
                      value={optionTwo.option}
                      id="one"
                      type="text"
                      name="one"
                      className="border border-black p-2 bg-slate-700 text-white flex-grow"
                      placeholder="Ex: 44.26"
                      required
                    />
                    <input
                      onChange={(e) => setOptionTwo({ ...optionTwo, isCorrect: e.target.checked })}
                      value={optionTwo.isCorrect}
                      type="checkbox"
                      name="answer"
                      id="answer"
                      className="accent-cyan-300 focus:accent-cyan-500 w-6 h-6 cursor-pointer"
                    />
                  </div>
                </div>
                {/* option three */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="three" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Option Three</label>
                  <div className="flex gap-4 items-center">
                    <input
                      onChange={(e) => setOptionThree({ ...optionThree, option: e.target.value })}
                      value={optionThree.option}
                      id="one"
                      type="text"
                      name="one"
                      className="border border-black p-2 bg-slate-700 text-white flex-grow"
                      placeholder="Ex: 44.26"
                      required
                    />
                    <input
                      onChange={(e) => setOptionThree({ ...optionThree, isCorrect: e.target.checked })}
                      value={optionThree.isCorrect}
                      type="checkbox"
                      name="answer"
                      id="answer"
                      className="accent-cyan-300 focus:accent-cyan-500 w-6 h-6 cursor-pointer"
                    />
                  </div>
                </div>
                {/* option four */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="four" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Option Four</label>
                  <div className="flex gap-4 items-center">
                    <input
                      onChange={(e) => setOptionFour({ ...optionFour, option: e.target.value })}
                      value={optionFour.option}
                      id="one"
                      type="text"
                      name="one"
                      className="border border-black p-2 bg-slate-700 text-white flex-grow"
                      placeholder="Ex: 44.26"
                      required
                    />
                    <input
                      onChange={(e) => setOptionFour({ ...optionFour, isCorrect: e.target.checked })}
                      value={optionFour.isCorrect}
                      type="checkbox"
                      name="answer"
                      id="answer"
                      className="accent-cyan-300 focus:accent-cyan-500 w-6 h-6 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-900 rounded-b">
                {/* cancel button */}
                <button
                  className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {/* submit button */}
                <button
                  type="submit"
                  className="border border-cyan items-center text-white bg-cyan px-4 py-1 rounded-full text-sm hover:bg-cyan-600 mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}
