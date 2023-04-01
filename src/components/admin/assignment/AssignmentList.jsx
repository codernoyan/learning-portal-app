import { useGetAssignmentsQuery } from 'features/assignments/assignmentsApi';
import AssignmentItem from './AssignmentItem';

export default function AssignmentList() {
  const {
    data: assignments, isLoading, isError, error,
  } = useGetAssignmentsQuery();

  let content = null;
  if (isLoading) {
    content = <tr><td>Loading....</td></tr>;
  } else if (!isLoading && isError) {
    content = <tr><td>{error?.error}</td></tr>;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <tr><td>No Videos found!</td></tr>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((assignment, index) => <AssignmentItem key={assignment.id} assignment={assignment} index={index} />);
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Title</th>
            <th className="table-th">Video Title</th>
            <th className="table-th">Mark</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/50">
          {content}
        </tbody>
      </table>
    </div>
  );
}
