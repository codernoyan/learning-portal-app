import { selectAuth } from 'features/auth/authSelector';
import { userLogout } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useMatch } from 'react-router-dom';

export default function StudentRoute({ children }) {
  const { user } = useSelector(selectAuth);
  const location = useLocation();
  const dispatch = useDispatch();
  // check if route is not available
  const match = useMatch('/course');

  if (user?.role === 'student' && !match) {
    return children;
  }
  dispatch(userLogout());
  localStorage.clear();
  return <Navigate to="/" state={{ from: location }} replace />;
}
