import { useState } from 'react';
import AddQuizInfo from './AddQuizInfo';

export default function AddQuizModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="w-full flex">
        <button onClick={() => setShowModal(true)} type="button" className="btn ml-auto">Add Quiz</button>
      </div>
      {showModal ? (
        <AddQuizInfo setShowModal={setShowModal} />
      ) : null}
    </>
  );
}
