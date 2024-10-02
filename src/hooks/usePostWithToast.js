import axios from 'axios';
import { toast } from 'react-toastify';
import { TOAST_MESSAGE } from '../utils/constants';

const usePostWithToast = (url) => {
  const postData = async (requestType, data, auth = false) => {
    try {
      toast.info(TOAST_MESSAGE[requestType].INFO, { autoClose: 2000 });
      const response = await axios.post(url, data, auth && auth);
      toast.success(TOAST_MESSAGE[requestType].SUCCESS, { autoClose: 3000 });
      return response.data;
    } catch (error) {
      toast.error(
        `${TOAST_MESSAGE[requestType].ERROR} ${
          error.response?.data?.message || error.response?.data?.error
        }`
      );
      throw error;
    }
  };
  return { postData };
};

export { usePostWithToast };
