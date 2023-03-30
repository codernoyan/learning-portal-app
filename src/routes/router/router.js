import Login from 'components/student/login/Login';
import Registration from 'components/student/registration/Registration';
import Video from 'components/student/video/Video';
import Course from 'layouts/Course';
import Main from 'layouts/Main';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // student portal
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Course />,
        children: [
          {
            path: '/videos/:videoId',
            element: <Video />,
          },
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
