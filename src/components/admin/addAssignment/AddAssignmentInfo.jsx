/* eslint-disable no-alert */
import { useAddAssignmentMutation } from 'features/assignments/assignmentsApi';
import { useGetVideosQuery } from 'features/videos/videosApi';
import { useState } from 'react';

export default function AddAssignmentInfo({ setShowModal }) {
  const [addAssignment, { isLoading, isError, error }] = useAddAssignmentMutation();
  const { data: videos } = useGetVideosQuery();
  // video info state
  const [input, setInput] = useState({
    title: '',
    video_title: '',
    totalMark: '',
  });
  // add a video
  const handleAddAssignment = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to add it?');
    if (confirmation) {
      const data = {
        title: input.title,
        video_id: JSON.parse(input.video_title).id,
        video_title: JSON.parse(input.video_title).title,
        totalMark: Number(input.totalMark),
      };
      addAssignment(data);
    } else {
      return;
    }
    setShowModal(false);
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black">
                Add Assignment
              </h3>
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <form onSubmit={handleAddAssignment}>
              <div className="relative p-6 flex-auto">
                {/* assignment title */}
                <div className="flex flex-col gap-1 mb-1">
                  <label htmlFor="assignment" className="text-black font-semibold after:content-['*'] after:text-red-500 after:ml-1">Assignment Title</label>
                  <input onChange={(e) => setInput({ ...input, title: e.target.value })} value={input.title} id="assignment" type="text" name="title" className="border border-black p-2 text-black" placeholder="Ex: https://github.com/learning-portal-lws" required />
                </div>
                {/* video title and total mark */}
                <div className="column-xs">
                  {/* video title */}
                  <div className="flex flex-col gap-1 flex-grow">
                    <label htmlFor="video_title" className="text-black font-semibold after:content-['*'] after:text-red-500 after:ml-1">Video Title</label>
                    {/* <input onChange={(e) => setInput({ ...input, views: e.target.value })} value={input.views} id="views" type="text" name="views" className="border border-black p-2 text-black" placeholder="Ex: 4.4K" required /> */}
                    <select
                      onChange={(e) => setInput({ ...input, video_title: e.target.value })}
                      value={input.video_title}
                      name="video"
                      id="video_title"
                      className="border border-black p-2 text-black"
                    >
                      <option hidden defaultValue>Select a video</option>
                      {
                        videos?.map((video) => <option key={video?.id} value={JSON.stringify(video)}>{video?.title}</option>)
                      }
                    </select>
                  </div>
                  {/* total mark */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="duration" className="text-black font-semibold after:content-['*'] after:text-red-500 after:ml-1">Total Mark</label>
                    <input onChange={(e) => setInput({ ...input, totalMark: e.target.value })} value={input.totalMark} id="duration" type="number" name="duration" className="border border-black p-2 text-black" placeholder="Ex: 44.26" required />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                  className="border border-cyan items-center text-black bg-cyan-600 px-4 py-1 rounded-full text-sm hover:bg-cyan hover:text-white mr-1 mb-1 ease-linear transition-all duration-150"
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
