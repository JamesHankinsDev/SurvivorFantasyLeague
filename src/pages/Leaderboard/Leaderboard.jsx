import axios from 'axios';
import { useEffect, useState } from 'react';
import { CastawayCard } from '../../components/CastawayCard';
import { getMyTeamStats } from '../../utils/pointsHelper';
import { getAPIURI } from '../../utils/API';

const Leaderboard = () => {
  const [allTribes, setAllTribes] = useState([]);
  const [showTribe, setShowTribe] = useState(null);
  const [showAllTribes, setShowAllTribes] = useState(false);

  useEffect(() => {
    const BASE_URI = getAPIURI();
    const fetchAllTribes = async () => {
      const response = await axios.get(`${BASE_URI}/api/team`, {
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
          <span className={'md:hidden text-sm'}>
            <br />
            See team castaways on Desktop!
          </span>
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
            className={'boton-elegante md:block hidden'}
            onClick={() => setShowAllTribes(true)}
          >
            Show All Tribes
          </button>
        )}
      </div>
      {allTribes
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((t) => (
          <div
            key={`leaderboard__${t._id}`}
            className={`flex justify-center items-center w-full`}
          >
            <div
              className={
                'flex flex-col bg-slate-600 md:p-5 my-2 rounded md:w-9/12 w-full'
              }
            >
              <div
                className={
                  'flex md:flex-row flex-col justify-between items-center m-2'
                }
              >
                <div className={'md:text-md text-sm text-slate-300'}>
                  Current Rank:
                  <div
                    className={'md:text-5xl text-lg font-extrabold text-center'}
                  >
                    {allTribes.indexOf(t) + 1}
                    {allTribes.indexOf(t) + 1 === 1
                      ? 'st'
                      : allTribes.indexOf(t) + 1 === 2
                      ? 'nd'
                      : allTribes.indexOf(t) + 1 === 3
                      ? 'rd'
                      : 'th'}
                  </div>
                </div>
                <div
                  className={
                    'md:text-3xl text-lg font-bold bg-slate-300 text-slate-700 p-2 rounded'
                  }
                >
                  {t.userId.username}
                </div>
                <div className={'md:text-md text-sm md:p-0 p-2 text-slate-300'}>
                  Total Points:
                  <div
                    className={'md:text-5xl text-md font-extrabold text-center'}
                  >
                    {t.totalPoints}
                  </div>
                </div>
              </div>
              <div className={'md:block hidden'}>
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
                        <CastawayCard
                          key={`leaderboard__castaways__${c._id}`}
                          castaway={c}
                          handleClick={null}
                        />
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
            </div>
          </div>
        ))}
    </>
  );
};

export default Leaderboard;
