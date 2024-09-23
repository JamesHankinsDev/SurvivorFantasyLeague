import axios from 'axios';
import { useEffect, useState } from 'react';
import { CastawayCard } from '../../components/CastawayCard';
import { getMyTeamStats } from '../../utils/pointsHelper';

const Leaderboard = () => {
  const [allTribes, setAllTribes] = useState([]);
  const [showTribe, setShowTribe] = useState(null);
  const [showAllTribes, setShowAllTribes] = useState(false);

  useEffect(() => {
    const fetchAllTribes = async () => {
      const response = await axios.get('http://localhost:5000/api/team', {
        headers: { Authorization: localStorage.getItem('token') },
      });

      const tribes = response.data.map((t) => {
        const totalPoints = getMyTeamStats(t.fantasyTribes)[0][1].count;

        return { ...t, totalPoints };
      });

      setAllTribes(tribes);
    };
    fetchAllTribes();
  }, []);

  return (
    <>
      <div className={'flex flex-row justify-between items-center'}>
        <div className={'text-xl font-bold text-slate-900'}>
          Welcome to the Leaderboard
        </div>
        {showAllTribes ? (
          <button
            className={'boton-elegante'}
            onClick={() => setShowAllTribes(false)}
          >
            Hide All Tribes
          </button>
        ) : (
          <button
            className={'boton-elegante'}
            onClick={() => setShowAllTribes(true)}
          >
            Show All Tribes
          </button>
        )}
      </div>
      {allTribes.map((t) => (
        <>
          <div className={'flex flex-col bg-slate-600 p-5 my-2 rounded'}>
            <div className={'flex flex-row justify-around items-center m-2'}>
              <div className={'text-md text-slate-300'}>
                Current Rank:
                <div className={'text-5xl font-extrabold text-center'}>
                  {allTribes.indexOf(t) + 1}
                  {allTribes.indexOf(t) + 1 === 1
                    ? 'st'
                    : allTribes.indexOf(t) + 2
                    ? 'nd'
                    : allTribes.indexOf(t) + 1
                    ? 'rd'
                    : 'th'}
                </div>
              </div>
              <div
                className={
                  'text-3xl font-bold bg-slate-300 text-slate-700 p-2 rounded'
                }
              >
                {t.userId.username}
              </div>
              <div className={'text-md text-slate-300'}>
                Total Points:
                <div className={'text-5xl font-extrabold text-center'}>
                  {t.totalPoints}
                </div>
              </div>
            </div>
            {showTribe === t._id || showAllTribes ? (
              <>
                <div className={'flex justify-center align-center mb-2'}>
                  <button
                    className={'boton-elegante'}
                    onClick={() => setShowTribe(null)}
                  >
                    Hide Tribe Members
                  </button>
                </div>
                <div
                  className={
                    'text-md text-slate-300 text-center italic text-sm'
                  }
                >
                  Current Tribe:
                </div>
                <hr className={'border-slate-300 m-3'} />
                <div className={'grid grid-cols-5 gap-3'}>
                  {t.castaways.map((c) => (
                    <CastawayCard castaway={c} handleClick={null} />
                  ))}
                </div>
              </>
            ) : (
              <div className={'flex justify-center align-center'}>
                <button
                  className={'boton-elegante'}
                  onClick={() => setShowTribe(t._id)}
                >
                  Show Tribe Members
                </button>
              </div>
            )}
          </div>
        </>
      ))}
    </>
  );
};

export default Leaderboard;
