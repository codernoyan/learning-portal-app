import useAuthCheck from 'hooks/useAuthCheck';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/router/router';
import './App.css';

function App() {
  const authenticationCheck = useAuthCheck();
  return !authenticationCheck
    ? <div><h2>Checking Authentication</h2></div>
    : <RouterProvider router={router} />;
}

export default App;
