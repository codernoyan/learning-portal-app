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

  const { data: assigmentMark, isLoading: markLoading } = useGetAssigmentMarksQuery();
  let content = null;
  let indexToCheckSubmission = null;
  let isExist = false;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && Object.keys(assignmentData)?.length === 0) {
    content = <Error message="No assignment found!" />;
  } else if (!isLoading && !isError && !markLoading && Object.keys(assignmentData)?.length > 0) {
    // send assignment information to a separate component
    content = <AssignmentInfo assignmentData={assignmentData[0]} setShowModal={setShowModal} />;
    // let's check if the student submit student or not
    indexToCheckSubmission = assigmentMark?.findIndex((mark) => mark.student_id === user?.id);
    isExist = indexToCheckSubmission !== -1 && assigmentMark[indexToCheckSubmission].title.includes(assignmentData[0].title);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} type="button" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary" disabled={isExist}>
        এসাইনমেন্ট
        {' '}
        {isExist && '- Mark Pending'}
      </button>
      {showModal ? (
        content
      ) : null}
    </>
  );
}
