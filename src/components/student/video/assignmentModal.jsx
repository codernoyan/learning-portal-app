/* eslint-disable react/no-unescaped-entities */
import { useGetAssigmentMarksQuery } from 'features/assignmentMarks/assignmentMarksApi';
import { useGetAssignmentByVideoIdQuery } from 'features/assignments/assignmentsApi';
import { selectAuth } from 'features/auth/authSelector';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import AssignmentInfo from './AssignmentInfo';

export default function AssignmentModal({ id }) {
  const [showModal, setShowModal] = useState(false);
  const {
    data: assignmentData, isLoading, isError, error,
  } = useGetAssignmentByVideoIdQuery(id);

  const { user } = useSelector(selectAuth);

  const { data: assigmentMark, isLoading: markLoading } = useGetAssigmentMarksQuery() || {};
  let content = null;
  let existedAssignmentData = null;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && Object.keys(assignmentData[0])?.length === 0) {
    content = <Error message="No assignment found!" />;
  } else if (!isLoading && !isError && !markLoading && Object.keys(assignmentData[0])?.length > 0) {
    // send assignment information to a separate component
    content = <AssignmentInfo assignmentData={assignmentData[0]} setShowModal={setShowModal} />;
    // get the actual assignment data if already submitted
    existedAssignmentData = assigmentMark?.find((mark) => mark.assignment_id === assignmentData[0].id && mark.student_id === user?.id);
  }

  return (
    <>
      {/* if assignment available */}
      {
        !existedAssignmentData?.id && (
        <button onClick={() => setShowModal(true)} type="button" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          এসাইনমেন্ট
        </button>
        )
      }
      {/* if assigment submitted */}
      {existedAssignmentData?.status === 'pending' && <h2 className="px-3 font-semibold py-1 border border-teal-500 text-white bg-teal-600 rounded-full text-sm">Mark Pending</h2>}
      {/* if assignment has publised */}
      {
        existedAssignmentData?.status === 'published' && (
          <h2 className="px-3 font-semibold py-1 border border-teal-500 text-white bg-teal-600 rounded-full text-sm">
            You got:
            {' '}
            {existedAssignmentData?.mark}
          </h2>
        )
      }
      {showModal ? (
        content
      ) : null}
    </>
  );
}
