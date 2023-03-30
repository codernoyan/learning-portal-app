import Video from 'components/student/video/Video';
import Course from 'layouts/Course';
import Main from 'layouts/Main';
import StudentLogin from 'pages/student/StudentLogin';
import StudentRegistration from 'pages/student/StudentRegistration';
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
        element: <StudentLogin />,
      },
      {
        path: '/registration',
        element: <StudentRegistration />,
      },
    ],
  },
]);
