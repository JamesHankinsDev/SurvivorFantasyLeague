import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePostWithToast } from '../usePostWithToast';
import { API_URL } from '../../utils/constants';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const { postData: postLogin } = usePostWithToast(API_URL.REGISTER);

  const handleRegister = async (credentials) => {
    setLoading(true);
    try {
      const { name, role, token } = await postLogin('REGISTER', credentials);
      login(name, role, token);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, success, loading, error };
};

export default useRegister;
