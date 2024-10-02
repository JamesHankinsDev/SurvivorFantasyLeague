import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePostWithToast } from '../usePostWithToast';
import { API_URL } from '../../utils/constants';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const { postData: postLogin } = usePostWithToast(API_URL.LOGIN);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const { name, role, token } = await postLogin('LOGIN', credentials);
      login(name, role, token);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, success, loading, error };
};

export default useLogin;
