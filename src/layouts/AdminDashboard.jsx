import Navbar from 'components/navbar/Navbar';
import { selectAuth } from 'features/auth/authSelector';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useSelector(selectAuth);

  return (
    <>
      {
        user && <Navbar />
      }
      <Outlet />
    </>
  );
}
