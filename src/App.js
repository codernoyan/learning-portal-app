import useAuthCheck from 'hooks/useAuthCheck';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/router/router';
import './App.css';

function App() {
  const authenticationCheck = useAuthCheck();
  return !authenticationCheck
    ? (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Checking
          {' '}
          <span className="text-cyan-500">Authentication</span>
        </h2>
      </div>
    )
    : <RouterProvider router={router} />;
}

export default App;
