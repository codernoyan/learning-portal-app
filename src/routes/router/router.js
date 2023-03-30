import Login from 'components/student/login/Login';
import Main from 'layouts/Main';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // student portal
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
