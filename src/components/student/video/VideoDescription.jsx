import { useGetAssignmentByVideoIdQuery } from 'features/assignments/assignmentsApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VideoDescription({ video = {} }) {
  const [showModal, setShowModal] = useState(false);
  const {
    id, title, description, createdAt,
  } = video;

  const {
    data: assignment, isLoading, isError, error,
  } = useGetAssignmentByVideoIdQuery(id);

  let content = null;
  if (isLoading) {
    content = 'Loading';
  } else if (!isLoading && isError) {
    content = `${error?.error}`;
  } else if (!isLoading && !isError && Object.keys(assignment)?.length === 0) {
    content = null;
  } else if (!isLoading && !isError && Object.keys(assignment)?.length > 0) {
    // content = (
    //   <Link to="/assignment" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
    //     এসাইনমেন্ট
    //   </Link>
    // );
    content = (
      <button type="button" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        এসাইনমেন্ট
      </button>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on
        {' '}
        {new Date(createdAt).toDateString().slice(4)}

      </h2>
      <div className="flex gap-4">
        {content}
        <Link to="/quiz" className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
          কুইজে
          অংশগ্রহণ
          করুন
        </Link>
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">
        {description}
      </p>
      {/* modal */}

    </div>
  );
}
