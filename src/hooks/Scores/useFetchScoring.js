import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAPIURI } from '../../utils/API';
import axios from 'axios';

const useFetchScoring = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const BASE_URI = getAPIURI();
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URI}/api/scoring`, {
            headers: { Authorization: accessToken },
          });
          setData(response.data ?? []);
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

export default useFetchScoring;
