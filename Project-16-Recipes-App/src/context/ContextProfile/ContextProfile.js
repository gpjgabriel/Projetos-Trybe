import { useState } from 'react';

const ContextProfile = () => {
  const [emailProfile, setEmailProfile] = useState({ email: '' });

  const contextProfileObj = {
    emailProfile,
    setEmailProfile,
  };

  return { contextProfileObj };
};

export default ContextProfile;
