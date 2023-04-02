/* eslint-disable react/no-unescaped-entities */
import { useGetAssignmentByVideoIdQuery } from 'features/assignments/assignmentsApi';
import { useState } from 'react';
import Error from 'ui/Error';
import Loading from 'ui/Loading';
import AssignmentInfo from './AssignmentInfo';

export default function AssignmentModal({ id }) {
  const [showModal, setShowModal] = useState(false);
  const {
    data: assignmentData, isLoading, isError, error,
  } = useGetAssignmentByVideoIdQuery(id);

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && Object.keys(assignmentData)?.length === 0) {
    content = <Error message="No assignment found!" />;
  } else if (!isLoading && !isError && Object.keys(assignmentData)?.length > 0) {
    // send assignment information to a separate component
    content = <AssignmentInfo assignmentData={assignmentData[0]} setShowModal={setShowModal} />;
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} type="button" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        এসাইনমেন্ট
      </button>
      {showModal ? (
        content
      ) : null}
    </>
  );
}