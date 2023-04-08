import { selectAuth } from 'features/auth/authSelector';
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { Navigate, useMatch } from 'react-router-dom';

export default function PublicStudent({ children }) {
  const isUserLoggedIn = useAuth();
  const { user } = useSelector(selectAuth);
  const match = useMatch('/');
  if (match && user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  if (!isUserLoggedIn) {
    return children;
  }
  return <Navigate to="course/videos/1" />;
  // return !isUserLoggedIn ? children : <Navigate to="course/videos/1" />;
}
