/* eslint-disable camelcase */
export default function Mark({ assignment }) {
  const {
    id, student_name, title, repo_link, mark, status, createdAt,
  } = assignment || {};

  // date formatting
  const date = new Date(createdAt);
  const submissionDate = date.toDateString().slice(4);
  const submissionTime = date.toLocaleTimeString();

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{`${submissionDate} ${submissionTime}`}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className="table-td input-mark">
        {
          status === 'pending'
            ? (
              <>
                <input max={100} defaultValue={mark} />
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </>
            )
            : <p>{mark}</p>
        }
      </td>
    </tr>
  );
}
