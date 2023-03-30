import Video from 'components/student/video/Video';
import AdminDashboard from 'layouts/AdminDashboard';
import Course from 'layouts/Course';
import Main from 'layouts/Main';
import AdminLogin from 'pages/admin/AdminLogin';
import Assginment from 'pages/admin/Assignment';
import AssignmentMark from 'pages/admin/AssignmentMark';
import Dashboard from 'pages/admin/Dashboard';
import Quizzes from 'pages/admin/Quizzes';
import Videos from 'pages/admin/Videos';
import Leaderboard from 'pages/student/Leaderboard';
import Quiz from 'pages/student/Quiz';
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
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/quiz',
        element: <Quiz />,
      },
    ],
  },
  // admin dashboard route
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      {
        path: '/admin',
        element: <Dashboard />,
      },
      {
        path: '/admin/login',
        element: <AdminLogin />,
      },
      {
        path: '/admin/assignment',
        element: <Assginment />,
      },
      {
        path: '/admin/assignmentMark',
        element: <AssignmentMark />,
      },
      {
        path: '/admin/quizzes',
        element: <Quizzes />,
      },
      {
        path: '/admin/videos',
        element: <Videos />,
      },
    ],
  },
]);
