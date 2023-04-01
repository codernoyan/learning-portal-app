import { useState } from 'react';

/* eslint-disable camelcase */
export default function Mark({ assignment }) {
  const {
    id, student_name, title, repo_link, mark, status, createdAt,
  } = assignment || {};
  // new mark state
  const [newMark, setNewMark] = useState(mark);

  // date formatting
  const date = new Date(createdAt);
  const submissionDate = date.toDateString().slice(4);
  const submissionTime = date.toLocaleTimeString();

  // add mark handler
  const handleAddMark = (e) => {
    e.preventDefault();
    console.log(Number(newMark));
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{`${submissionDate} ${submissionTime}`}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      {
          status === 'pending'
            ? (
              <td className="table-td input-mark">
                <form onSubmit={handleAddMark} className="flex gap-2 justify-end">
                  <input onChange={(e) => setNewMark(e.target.value)} max={100} defaultValue={newMark} />
                  <button type="submit">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </button>
                </form>
              </td>
            )
            : (
              <td className="table-td">
                <p>{mark}</p>
              </td>
            )
        }
    </tr>
  );
}
