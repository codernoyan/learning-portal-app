import { useLoginMutation } from 'features/auth/authApi';
import { selectAuth } from 'features/auth/authSelector';
import { useGetAdminInfoQuery } from 'features/users/usersApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const [loginError, setLoginError] = useState('');
  // user check from store
  const { user } = useSelector(selectAuth);

  // get location data
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/course/videos/1';
  console.log(from);
  const navigate = useNavigate();
  const [login, {
    data: response,
    isLoading, isError, isSuccess, error,
  }] = useLoginMutation();

  // get admin data
  const { data: adminInfo } = useGetAdminInfoQuery();

  // user info state
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // console.log(adminInfo?.[0].email);

  // login handler
  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (loginInfo.email === adminInfo?.[0]?.email) {
      setLoginError('Student email does not match');
      return;
    }
    setLoginError('');
    login(loginInfo);
  };

  useEffect(() => {
    if (error?.data) {
      setLoginError(error?.data);
    }

    if (isSuccess && user?.id) {
      // reset
      setLoginError('');
      setLoginInfo({
        email: '',
        password: '',
      });
      // navigate('course/videos/1');
      navigate(from, { replace: true });
    }
  }, [response, error, isSuccess, user]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form onSubmit={handleStudentLogin} className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} id="email-address" name="email" type="email" autoComplete="email" required className="login-input rounded-t-md" placeholder="Email address" value={loginInfo.email} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} id="password" name="password" type="password" autoComplete="current-password" required className="login-input rounded-b-md" placeholder="Password" value={loginInfo.password} />
            </div>
            {loginError && <h2 className="text-rose-500 mt-4 font-semibold">{loginError}</h2>}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-violet-600 hover:text-violet-500">
                Create New Account
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/admin/login" className="font-medium text-violet-600 hover:text-violet-500">
                Admin Login
              </Link>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" disabled={isLoading}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
