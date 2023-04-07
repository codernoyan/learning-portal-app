import { useRegisterMutation } from 'features/auth/authApi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentRegistration() {
  const [error, setError] = useState('');
  const [register, {
    data, isLoading, isError, error: registrationError,
  }] = useRegisterMutation();
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(error);
  }, [error, registrationError]);

  // login handler
  const handleStudentRegistration = (e) => {
    e.preventDefault();
    // clear the error state if previous error stored
    setError('');
    if (registerInfo.password !== registerInfo.confirmPassword) {
      setError('Passwords do not match');
    } else {
      delete registerInfo.confirmPassword;
      // register
      register({ ...registerInfo, role: 'student' });
      // reset
      setRegisterInfo({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/course/videos/1');
    }
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form onSubmit={handleStudentRegistration} className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} id="name" name="name" type="name" autoComplete="name" required className="login-input rounded-t-md" placeholder="Student Name" value={registerInfo.name} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })} id="email-address" name="email" type="email" autoComplete="email" required className="login-input " placeholder="Email address" value={registerInfo.email} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })} id="password" name="password" type="password" autoComplete="current-password" required className="login-input" placeholder="Password" value={registerInfo.password} />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input onChange={(e) => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })} id="confirm-password" name="confirm-password" type="password" autoComplete="confirm-password" required className="login-input rounded-b-md" placeholder="Confirm Password" value={registerInfo.confirmPassword} />
            </div>
            {error !== '' && <h2 className="text-rose-500 mt-4 font-semibold">{error}</h2>}
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm flex gap-2">
              <span>Already have an account</span>
              <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
                Sign In
              </Link>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" disabled={isLoading}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
