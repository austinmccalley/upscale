import { useState } from 'react';
import useUser from '../lib/useUser';

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState('');


  return (
    <div className="login">
      
    </div>
  )
};
