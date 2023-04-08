import { useGetAssignmentByVideoIdQuery } from 'features/assignments/assignmentsApi';
import { selectAuth } from 'features/auth/authSelector';
import { useGetQuizMarksQuery } from 'features/quizMark/quizMarkApi';
import { useGetQuizzesByVideoIdQuery } from 'features/quizzes/quizzesApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AssignmentModal from './AssignmentModal';

export default function VideoDescription({ video = {} }) {
  const [showModal, setShowModal] = useState(false);
  const {
    id, title, description, createdAt,
  } = video;
  const { user } = useSelector(selectAuth);
  const {
    data: assignment, isLoading, isError, error,
  } = useGetAssignmentByVideoIdQuery(id);

  const { data: quizzes } = useGetQuizzesByVideoIdQuery(id);
  const { data: quizMark } = useGetQuizMarksQuery();

  let content = null;
  let isAuizSubmitted = null;
  if (isLoading) {
    content = 'Loading';
  } else if (!isLoading && isError) {
    content = `${error?.error}`;
  } else if (!isLoading && !isError && Object.keys(assignment)?.length === 0) {
    content = null;
  } else if (!isLoading && !isError && Object.keys(assignment)?.length > 0) {
    content = <AssignmentModal id={id} />;
    isAuizSubmitted = quizMark?.filter((mark) => mark.video_id === id && mark.student_id === user?.id);
  }
  console.log(isAuizSubmitted);

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
        {
          isAuizSubmitted?.length > 0 && <h2 className="px-3 font-semibold py-1 border border-teal-500 text-white bg-teal-600 rounded-full text-sm">Quiz Sumitted</h2>
        }
        {
          quizzes?.length !== 0 && isAuizSubmitted?.length === 0 && (
          <Link to={`/quiz/${id}`} className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            কুইজে
            অংশগ্রহণ
            করুন
          </Link>
          )
        }
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">
        {description}
      </p>
    </div>
  );
}
