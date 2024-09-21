import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CastawayCard } from './components/CastawayCard';
import { TribeMemberCard } from './components/TribeMemberCard';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const [tribeName, setTribeName] = useState('');
  const [newCastaway, setNewCastaway] = useState({
    name: '',
    tribe: '',
    season: '',
    status: '',
    imageUrl: '',
  });
  const [editCastaway, setEditCastaway] = useState(null);
  const [scoringRecords, setScoringRecords] = useState([]);
  const [myScore, setMyScore] = useState('');

  useEffect(() => {
    if (localStorage.getItem('name')) {
      setTribeName(localStorage.getItem('name'));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('Logged Out');
    // navigate('/');
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

      try {
        setMyTeam(response.data.castaways ?? null);
        setMyScore(response.data.totalPoints);
      } catch {
        setMyTeam(null);
      }
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
      console.error('Error adding castaway: ', err);
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
      console.error({ err });
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

  // ADMIN FEATURES //
  const addCastaway = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/castaway',
        newCastaway,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      setCastaways([...castaways, response.data]);
      setNewCastaway({ name: '', tribe: '', season: '' });
    } catch (error) {
      alert('Error adding castaway: ', error);
    }
  };

  useEffect(() => {
    const fetchScoringRecords = async () => {
      const response = await axios.get('http://localhost:5000/api/scoring', {
        headers: { Authorization: localStorage.getItem('token') },
      });

      setScoringRecords(response.data);
    };
    fetchScoringRecords();
  }, []);

  return (
    <div className={'bg-slate-900 min-h-screen text-slate-300 p-5'}>
      <div className={'flex justify-between'}>
        <h1 className="text-3xl">Dashboard</h1>
        <h1 className={'text-2xl fond-bold'}>
          {tribeName} | {myScore} Points
        </h1>
        <button onClick={() => logout()}>Log Out</button>
      </div>
      <hr />
      <div className={'flex flex-row justify-around items-center p-5'}>
        <div className="tooltip-container">
          <span className="text">VA: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Total Votes Against your Tribe Members</p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">VF: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>
              Votes against eliminated Castaways | +2
            </p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">CW: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Challenge Wins | +10</p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">IW: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Immunity Wins | +15</p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">IF: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Idols Found | +20</p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">TC: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Tribal Councils | +5</p>
          </span>
        </div>
        <div className="tooltip-container">
          <span className="text">El: ###</span>
          <span className="tooltip">
            <p className={'text-xsm'}>Eliminatatins | -10 each</p>
          </span>
        </div>
      </div>

      <hr />
      <h1 className="text-xl fond-bold">Your Fantasy Tribe Members</h1>
      <hr />
      {myTeam ? (
        <div
          className={
            'grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 my-5'
          }
        >
          {myTeam.map((id) => {
            const castaway = castaways.find((c) => c._id === id);
            return (
              // <TribeMemberCard
              //   castaway={castaway}
              //   handleClick={dropCastawayFromTeam}
              //   scoringRecords={scoringRecords}
              //   key={`tribeMember__${castaway._id}`}
              // />
              <h1>hi</h1>
            );
          })}
        </div>
      ) : (
        <div className={'w-full flex justify-center items-center flex-col'}>
          <h1 className="text-lg pt-5">
            You haven't created a Fantasy Tribe yet!
          </h1>
          <button className="boton-elegante my-5" onClick={createTeam}>
            Create Tribe
          </button>
        </div>
      )}
      <hr />

      <h1 className="text-xl font-bold">Available Castaways</h1>
      {localStorage.getItem('role') === 'admin' && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCastaway();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={newCastaway.name}
              onChange={(e) =>
                setNewCastaway({ ...newCastaway, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tribe"
              value={newCastaway.tribe}
              onChange={(e) =>
                setNewCastaway({
                  ...newCastaway,
                  tribe: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Season"
              value={newCastaway.season}
              onChange={(e) =>
                setNewCastaway({ ...newCastaway, season: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="status"
              value={newCastaway.status}
              onChange={(e) =>
                setNewCastaway({ ...newCastaway, status: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newCastaway.imageUrl}
              onChange={(e) =>
                setNewCastaway({ ...newCastaway, imageUrl: e.target.value })
              }
            />

            <button type="submit" className="m-5 boton-elegante">
              Add Castaway
            </button>
          </form>
        </>
      )}
      <hr />
      {/* <div className="flex justify-center items-center flex-wrap"> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:gird-cols-2 gap-3 my-5">
        {castaways.map((c) => {
          return (
            <CastawayCard
              castaway={c}
              scoringRecords={scoringRecords}
              handleClick={addCastawayToTeam}
              setCastaways={setCastaways}
              castaways={castaways}
              key={`availableCastaways__${c._id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
