import { useState, useEffect } from 'react';
import { getAPIURI } from '../../utils/API';
import axios from 'axios';

const useFetchCastaways = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const BASE_URI = getAPIURI();
    const authToken = localStorage.getItem('token');
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URI}/api/admin/castaways`, {
          headers: { Authorization: authToken },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchCastaways;
