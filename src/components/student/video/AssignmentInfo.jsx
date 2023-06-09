/* eslint-disable no-alert */
import { useAddAssignmentMarkMutation } from 'features/assignmentMarks/assignmentMarksApi';
import { selectAuth } from 'features/auth/authSelector';
import { useState } from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable react/no-unescaped-entities */
export default function AssignmentInfo({ assignmentData, setShowModal }) {
  const [githubLink, setGithubLink] = useState('');
  const { user } = useSelector(selectAuth);
  const [addAssignmentMark, { isLoading, isError, error }] = useAddAssignmentMarkMutation();
  const { id, title } = assignmentData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to submit?');
    if (confirmation) {
      const data = {
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: id,
        title,
        createdAt: new Date().toISOString(),
        totalMark: 100,
        mark: 0,
        repo_link: githubLink,
        status: 'pending',
      };
      addAssignmentMark(data);
    } else {
      return;
    }
    // disappear modal
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
                  <label htmlFor="assignment" className="text-white font-semibold after:content-['*'] after:text-red-500 after:ml-1">GitHub Repository Link</label>
                  <input onChange={(e) => setGithubLink(e.target.value)} value={githubLink} id="assignment" type="text" name="repository_link" className="border border-black p-2 bg-slate-700 text-white" placeholder="Ex: https://github.com/learning-portal-lws" required />
                </div>
              </div>
              {/* footer */}
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
