/* eslint-disable no-alert */
import { useEditVideoMutation } from 'features/videos/videosApi';
import { useState } from 'react';

export default function EditVideoInfo({ video, setShowModal }) {
  // destructure the data
  const {
    id, title, description, url, views, duration,
  } = video || {};

  // edit video api
  const [editVideo, { isLoading, isError, error }] = useEditVideoMutation();

  // video info state
  const [input, setInput] = useState({
    id,
    title,
    description,
    url,
    views,
    duration,
    createdAt: new Date().toISOString(),
  });
  // add a video
  const handleAddVideo = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to update it?');
    if (confirmation) {
      editVideo({ id: input.id, data: input });
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
                Edit
                {' '}
                <span className="text-cyan">Video</span>
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
            <form onSubmit={handleAddVideo}>
              <div className="relative px-6 py-1 flex-auto">
                {/* title */}
                <div className="flex flex-col gap-1 mb-1">
                  <label htmlFor="assignment" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Title</label>
                  <input onChange={(e) => setInput({ ...input, title: e.target.value })} value={input.title} id="assignment" type="text" name="title" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: https://github.com/learning-portal-lws" required />
                </div>
                {/* url */}
                <div className="flex flex-col gap-1 mb-1">
                  <label htmlFor="url" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Video URL</label>
                  <input onChange={(e) => setInput({ ...input, url: e.target.value })} value={input.url} id="url" type="text" name="url" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: https://youtu.be/99RWZsEITx4" required />
                </div>
                {/* views and duration */}
                <div className="columns-xs mb-1">
                  {/* views */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="views" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Views</label>
                    <input onChange={(e) => setInput({ ...input, views: e.target.value })} value={input.views} id="views" type="text" name="views" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: 4.4K" required />
                  </div>
                  {/* duration */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="duration" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Duration</label>
                    <input onChange={(e) => setInput({ ...input, duration: e.target.value })} value={input.duration} id="duration" type="text" name="duration" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: 44.26" required />
                  </div>
                </div>
                {/* description */}
                <div className="flex flex-col gap-1 mb-1">
                  <label htmlFor="description" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">Description</label>
                  <textarea onChange={(e) => setInput({ ...input, description: e.target.value })} value={input.description} name="description" id="description" cols={10} rows={3} className="border border-black p-2 bg-slate-700 text-white" placeholder="write description here..." />
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
                  Save
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
