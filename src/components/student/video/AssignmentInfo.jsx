import { useState } from 'react';

/* eslint-disable react/no-unescaped-entities */
export default function AssignmentInfo({ assignmentData, setShowModal }) {
  const [githubLink, setGithubLink] = useState('');
  const { id, title } = assignmentData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure?');
    if (confirmation) {
      console.log(githubLink);
    } else {
      return;
    }
    // disappear modal
    setShowModal(false);
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black">
                {title}
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
            <form onSubmit={handleSubmit}>
              <div className="relative p-6 flex-auto">
                <div className="flex flex-col gap-1">
                  <label htmlFor="assignment" className="text-black font-semibold after:content-['*'] after:text-red-500 after:ml-1">GitHub Repository Link</label>
                  <input onChange={(e) => setGithubLink(e.target.value)} value={githubLink} id="assignment" type="text" name="repository_link" className="border border-black p-2 text-black" placeholder="Ex: https://github.com/learning-portal-lws" required />
                </div>
              </div>
              {/* footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-cyan items-center text-black bg-cyan-600 px-4 py-1 rounded-full text-sm hover:bg-cyan hover:text-white mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Submit Assignment
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
