import Navbar from 'components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
