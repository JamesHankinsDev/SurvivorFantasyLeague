import axios from 'axios';

export const getScoringRecords = async (setter) => {
  const response = await axios.get('http://localhost:5000/api/scoring', {
    headers: { Authorization: localStorage.getItem('token') },
  });
  return response.data;
};

export const getCastaways = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/admin/castaways',
    {
      headers: { Authorization: localStorage.getItem('token') },
    }
  );
  return response.data;
};

export const getMyTeamDetails = async () => {
  const response = await axios.get('http://localhost:5000/api/team/myTeam', {
    headers: { Authorization: localStorage.getItem('token') },
  });

  console.log({ response: response.data });

  return response.data;
};
