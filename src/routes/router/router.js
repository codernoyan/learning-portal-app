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
import PrivateRoute from 'routes/privateRoute/PrivateRoute';
import PublicAdmin from 'routes/publicRoutes/PublicAdmin';
import PublicStudent from 'routes/publicRoutes/PublicStudent';

export const router = createBrowserRouter([
  // student portal
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: (
          <PublicStudent>
            <StudentLogin />
          </PublicStudent>
        ),
      },

      {
        path: '/course',
        element: (
          <PrivateRoute>
            <Course />
          </PrivateRoute>
        ),
        children: [
          {
            path: '/course/videos/:videoId',
            element: (
              <PrivateRoute>
                <Video />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: 'leaderboard',
        element: (
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/quiz/:videoId',
        element: (
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        ),
      },
    ],
  },
  // separate login route
  // {
  //   path: '/login',
  //   element: (
  //     <PublicStudent>
  //       <StudentLogin />
  //     </PublicStudent>
  //   ),
  // },
  // separate register route
  {
    path: '/register',
    element: <StudentRegistration />,
  },
  // admin dashboard route
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      // {
      //   path: '/admin/login',
      //   element: (
      //     <PublicAdmin>
      //       <AdminLogin />
      //     </PublicAdmin>
      //   ),
      // },
      {
        path: '/admin/',
        element: <Dashboard />,
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
  {
    path: '/admin/login',
    element: (
      <PublicAdmin>
        <AdminLogin />
      </PublicAdmin>
    ),
  },
]);
