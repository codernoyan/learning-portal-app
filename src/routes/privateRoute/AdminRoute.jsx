import { selectAuth } from 'features/auth/authSelector';
import { userLogout } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { user } = useSelector(selectAuth);
  const location = useLocation();
  const dispatch = useDispatch();

  if (user?.role === 'admin') {
    return children;
  }
  dispatch(userLogout());
  localStorage.clear();
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}
