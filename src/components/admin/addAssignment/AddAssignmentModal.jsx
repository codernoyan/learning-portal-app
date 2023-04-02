import { useState } from 'react';
import AddAssignmentInfo from './AddAssignmentInfo';

export default function AddAssignmentModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="w-full flex">
        <button onClick={() => setShowModal(true)} type="button" className="btn ml-auto">Add Assignment</button>
      </div>
      {showModal ? (
        <AddAssignmentInfo setShowModal={setShowModal} />
      ) : null}
    </>
  );
}
