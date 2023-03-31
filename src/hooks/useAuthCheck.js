import { userLogin } from 'features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage?.getItem('auth');

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(userLogin({
          accessToken: auth.accessToken,
          user: auth.user,
        }));
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);
  return authChecked;
}
