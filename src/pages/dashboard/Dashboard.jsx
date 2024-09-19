import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CastawayCard } from './components/CastawayCard';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const [tribeName, setTribeName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('name')) {
      setTribeName(localStorage.getItem('name'));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged Out');
    navigate('/');
  };

  const [castaways, setCastaways] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [message, setMessage] = useState('');

  // Get all castaways
  useEffect(() => {
    const fetchCastaways = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/admin/castaways',
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      setCastaways(response.data);
    };
    fetchCastaways();
  }, []);

  // Get Logged In Users Team.
  useEffect(() => {
    const fetchMyTeam = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/team/myTeam',
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      setMyTeam(response.data.castaways);
    };
    fetchMyTeam();
  }, []);

  // Add castaway to your team.
  const addCastawayToTeam = async (castawayId) => {
    try {
      if (myTeam.length >= 5) {
        setMessage('You have already drafted 5 castaways for your tribe');
      }
      const response = await axios.post(
        `http://localhost:5000/api/team/add/${castawayId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      setMyTeam(response.data.castaways);

      setMessage('');
    } catch (err) {
      setMessage('Error adding castaway');
    }
  };

  // Drop castaway from team.
  const dropCastawayFromTeam = async (castawayId) => {
    try {
      if (myTeam.length === 0) {
        setMessage('You do not have any active tribe members');
      }
      const response = await axios.post(
        `http://localhost:5000/api/team/drop/${castawayId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      setMyTeam(response.data.castaways);

      setMessage('');
    } catch (err) {
      setMessage('Error dropping castaway');
    }
  };

  // Create a team!
  const createTeam = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/team`,
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    setMyTeam(response.data[0].castaways);
  };

  return (
    <div className={'bg-slate-900 h-screen text-slate-300 p-5'}>
      <div className={'flex justify-between'}>
        <h1 className="text-3xl">Dashboard</h1>
        <button onClick={() => logout()}>Log Out</button>
      </div>
      <p>{tribeName}</p>
      {castaways.map((c) => (
        <CastawayCard castaway={c} />
      ))}
    </div>
  );
};

export default Dashboard;
