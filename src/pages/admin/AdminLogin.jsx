import { useLoginMutation } from 'features/auth/authApi';
import { useGetUsersQuery } from 'features/users/usersApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { data: users } = useGetUsersQuery();
  const [login, {
    data: response,
    isLoading, isError, error,
  }] = useLoginMutation();

  const navigate = useNavigate();
  // user info state
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // login handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // console.log(data);
    const indexOfAdmin = users?.findIndex(({ email }) => email === loginInfo.email);
    const adminData = users[indexOfAdmin];
    if (indexOfAdmin !== -1) {
      login(loginInfo);
    }
    // reset
    setLoginInfo({
      email: '',
      password: '',
    });
    // navbigate to admin dashboard
    navigate('/admin');
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Admin Account
          </h2>
        </div>
        <form onSubmit={handleAdminLogin} className="mt-8 space-y-6" action="#" method="POST">
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
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
