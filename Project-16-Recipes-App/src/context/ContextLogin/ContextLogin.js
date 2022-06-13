import { useEffect, useState } from 'react';
import { MIN_LENGTH_LOGIN } from '../../constants';

const ContextLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordCheck = password.length > MIN_LENGTH_LOGIN;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const contextLoginObj = {
    setEmail,
    email,
    setPassword,
    disabled,
  };

  return { contextLoginObj };
};

export default ContextLogin;
