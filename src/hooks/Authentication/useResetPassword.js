import { useState } from 'react';
import { usePostWithToast } from '../usePostWithToast';
import { API_URL } from '../../utils/constants';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { postData: postResetPassword } = usePostWithToast(
    API_URL.RESET_PASSWORD
  );

  const handleResetPassword = async (payload) => {
    setLoading(true);
    try {
      await postResetPassword('RESET_PASSWORD', payload);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, success, loading, error };
};

export default useResetPassword;
