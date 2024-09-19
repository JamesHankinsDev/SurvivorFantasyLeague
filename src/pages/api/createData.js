import axios from 'axios';

export const addCastawayToTeam = async (castawayId) => {
  const response = await axios.post(
    `http://localhost:5000/api/team/add/${castawayId}`,
    {},
    {
      headers: { Authorization: localStorage.getItem('token') },
    }
  );

  return response.data;
};

export const createTeam = async () => {
  const response = await axios.post(
    `http://localhost:5000/api/team`,
    {},
    {
      headers: { Authorization: localStorage.getItem('token') },
    }
  );
  return response.data;
};

const createCastaway = async (newCastaway) => {
  const response = await axios.post(
    'http://localhost:5000/api/admin/castaway',
    newCastaway,
    {
      headers: { Authorization: localStorage.getItem('token') },
    }
  );
  return response.data;
};

const createUser = async (e, user) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/auth/register', user);
    alert('Registration successful');
  } catch (error) {
    alert('Error in registreation');
  }
};
