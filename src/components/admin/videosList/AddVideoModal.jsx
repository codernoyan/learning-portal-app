import { useState } from 'react';
import AddVideoInfo from './AddVideoInfo';

export default function AddVideoModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="w-full flex">
        <button onClick={() => setShowModal(true)} type="button" className="btn ml-auto">Add Video</button>
      </div>
      {showModal ? (
        <AddVideoInfo setShowModal={setShowModal} />
      ) : null}
    </>
  );
}
