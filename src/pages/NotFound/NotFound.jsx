import { selectAuth } from 'features/auth/authSelector';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  // get user data from check role
  const { user } = useSelector(selectAuth);
  // check which route is behind
  const from = location?.state?.from?.pathname || user?.role === 'admin' ? '/admin' : 'course/videos/1';
  // navigate to an specific route
  const handleNavigate = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="grid h-screen px-4 place-content-center bg-modal">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-200 sm:text-4xl">
          Oops!
        </p>
        <p className="mt-4 text-2xl font-semibold text-cyan-500">
          {' '}
          <em>{error.statusText || error.message}</em>
        </p>
        <button onClick={handleNavigate} type="button" className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-cyan-600 rounded hover:bg-cyan-700 focus:ring">
          Go Back Home
        </button>
      </div>
    </div>
  );
}
