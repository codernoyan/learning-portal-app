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
import AdminRoute from 'routes/privateRoute/AdminRoute';
import StudentRoute from 'routes/privateRoute/StudentRoute';
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
          <StudentRoute>
            <Course />
          </StudentRoute>
        ),
        children: [
          {
            path: '/course/videos/:videoId',
            element: (
              <StudentRoute>
                <Video />
              </StudentRoute>
            ),
          },
        ],
      },
      {
        path: 'leaderboard',
        element: (
          <StudentRoute>
            <Leaderboard />
          </StudentRoute>
        ),
      },
      {
        path: '/quiz/:videoId',
        element: (
          <StudentRoute>
            <Quiz />
          </StudentRoute>
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
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
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
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/assignment',
        element: (
          <AdminRoute>
            <Assginment />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/assignmentMark',
        element: (
          <AdminRoute>
            <AssignmentMark />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/quizzes',
        element: (
          <AdminRoute>
            <Quizzes />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/videos',
        element: (
          <AdminRoute>
            <Videos />
          </AdminRoute>
        ),
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
