import { useState, useEffect } from 'react';
import { getAPIURI } from '../../utils/API';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const useFetchFantasyTribes = () => {
  const { accessToken } = useAuth();
  const [myTribe, setMyTribe] = useState(null);
  const [allTribes, setAllTribes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const BASE_URI = getAPIURI();
      const fetchData = async () => {
        setLoading(true);
        try {
          const allTribeResponse = await axios.get(`${BASE_URI}/api/team`, {
            headers: { Authorization: accessToken },
          });
          const myTribeResponse = await axios.get(
            `${BASE_URI}/api/team/myTeam`,
            {
              headers: { Authorization: accessToken },
            }
          );

          setAllTribes(allTribeResponse.data);
          setMyTribe(myTribeResponse.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [accessToken]);

  return { myTribe, allTribes, loading, error };
};

export default useFetchFantasyTribes;
