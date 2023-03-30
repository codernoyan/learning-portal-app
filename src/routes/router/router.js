import Login from 'components/student/login/Login';
import Registration from 'components/student/registration/Registration';
import Main from 'layouts/Main';
import CoursePlayer from 'pages/coursePlayer/CoursePlayer';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // student portal
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <CoursePlayer />,
        children: [

        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
]);
