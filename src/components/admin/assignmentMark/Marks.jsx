import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import Mark from './Mark';

export default function Marks() {
  const {
    data: assignmentMarks, isLoading, isError, error,
  } = useGetAssigmentMarksQuery();

  // let's decide what will be rendered
  let content = null;
  let pendingMark = null;
  let markSent = null;

  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <tr><td>No marks found!</td></tr>;
  } else if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks.map((assignment) => <Mark key={assignment.id} assignment={assignment} />);
    // marks statistics
    pendingMark = assignmentMarks.filter((assignment) => assignment.status === 'pending');
    markSent = assignmentMarks.filter((assignment) => assignment.status === 'published');
  }

  return (
    <div className="px-3 py-20 bg-opacity-10">
      <ul className="assignment-status">
        <li>
          Total
          {' '}
          <span>{isLoading ? 0 : assignmentMarks?.length}</span>
        </li>
        <li>
          Pending
          {' '}
          <span>{isLoading ? 0 : pendingMark?.length}</span>
        </li>
        <li>
          Mark Sent
          {' '}
          <span>{isLoading ? 0 : markSent?.length}</span>
        </li>
      </ul>
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Assignment</th>
              <th className="table-th">Date</th>
              <th className="table-th">Student Name</th>
              <th className="table-th">Repo Link</th>
              <th className="table-th">Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600/50">
            {content}
          </tbody>
        </table>
      </div>
    </div>
  );
}
