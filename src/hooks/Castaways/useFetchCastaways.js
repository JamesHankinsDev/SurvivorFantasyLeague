import { useState, useEffect } from 'react';
import { getAPIURI } from '../../utils/API';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const useFetchCastaways = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const BASE_URI = getAPIURI();
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URI}/api/admin/castaways`, {
            headers: { Authorization: accessToken },
          });
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [accessToken]);

  return { data, loading, error };
};

export default useFetchCastaways;
