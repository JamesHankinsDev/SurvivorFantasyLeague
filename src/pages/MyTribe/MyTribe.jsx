import axios from 'axios';
import { useEffect, useState } from 'react';
import { CastawayCard } from '../../components/CastawayCard';
import { StatBadge } from '../../components/StatBadge';
import { getMyTeamStats } from '../../utils/pointsHelper';
import { getAPIURI } from '../../utils/API';
import { useCastaways } from '../../context/CastawayContext';

const MyTribe = () => {
  const [myTribe, setMyTribe] = useState([]);
  const [tribeHistory, setTribeHistory] = useState([]);
  const [targetWeek, setTargetWeek] = useState(null);
  const [activeTab, setActiveTab] = useState('myTribe');
  // const [castaways, setCastaways] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchMyTribe = async () => {
      const BASE_URI = getAPIURI();
      const response = await axios.get(`${BASE_URI}/api/team/myTeam`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      try {
        setMyTribe(response.data.castaways ?? null);
        setTribeHistory(response.data.fantasyTribes);
        const pointHelperRes = getMyTeamStats(response.data.fantasyTribes);
        setStats(pointHelperRes);
      } catch {
        setMyTribe(null);
      }
    };
    fetchMyTribe();
  }, []);

  const {
    cachedCastaways: castaways,
    loading,
    error,
    refetch,
  } = useCastaways();

  const freezeTribeCastaways = async () => {
    const BASE_URI = getAPIURI();
    const response = await axios.post(
      `${BASE_URI}/api/team/freeze`,
      { targetWeek },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );

    try {
      setMyTribe(response.data.castaways ?? null);
    } catch {
      setMyTribe(null);
    }
  };

  // Add castaway to your team.
  const addCastawayToTeam = async (castawayId) => {
    try {
      if (myTribe.length >= 5) {
        alert('You have already drafted 5 castaways for your tribe');
      } else {
        const BASE_URI = getAPIURI();
        const response = await axios.post(
          `${BASE_URI}/api/team/add/${castawayId}`,
          {},
          {
            headers: { Authorization: localStorage.getItem('token') },
          }
        );

        setMyTribe(response.data.castaways);
      }
    } catch (err) {
      console.error('Error adding castaway: ', err);
    }
  };

  // Create a Tribe
  const createATribe = async () => {
    const BASE_URI = getAPIURI();
    const response = await axios.post(
      `${BASE_URI}/api/team`,
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    setMyTribe(response.data.castaways);
  };

  // Drop castaway from team.
  const dropCastawayFromTeam = async (castawayId) => {
    let addDrops;

    if (tribeHistory && tribeHistory.length !== 0) {
      const lastWeek = tribeHistory
        .map((ft) => ft.week)
        .reduce((p, c) => (p < c ? c : p), 1);
      const currentTribe = myTribe.map((c) => c._id);
      const priorTribe = tribeHistory
        .find((ft) => ft.week === lastWeek)
        .castaways.map((c) => c._id);

      addDrops = currentTribe.filter((c) => !priorTribe.includes(c));
    }

    try {
      if (myTribe.length === 0) {
        alert('You do not have any active tribe members');
      } else if (tribeHistory || tribeHistory.length === 0) {
        if (
          (tribeHistory.length > 0 &&
            addDrops.length >= 1 &&
            !addDrops.includes(castawayId)) ||
          myTribe.length === 4
        ) {
          alert('Only 1 Add/Drop per week!');
        } else {
          const BASE_URI = getAPIURI();
          const response = await axios.post(
            `${BASE_URI}/api/team/drop/${castawayId}`,
            {},
            {
              headers: { Authorization: localStorage.getItem('token') },
            }
          );
          setMyTribe(response.data.castaways);
        }
      }
    } catch (err) {
      console.error({ err });
    }
  };

  return (
    <div className="flex flex-col">
      <div className={`text-xl font-bold text-slate-900`}>
        This is your Fantasy Tribe roster.
      </div>
      <div className={`text-md text-slate-900`}>
        Here, you can review your current Fantasy Tribe, and edit your roster.
        Keep in mind, you can only replace one castaway from your team each
        week. Additionally, your Fantasy Tribe will lock after the Merge!
      </div>
      <br />
      <div className={`text-md text-slate-900`}>
        Keep in mind, your tribe will lock at 8:00 PM EST on Wednesday nights.
        This is to make sure we can appropriately track scoring each week. You
        will be able to make edits again the following day, Thursday, starting
        at 12:00 AM.
      </div>
      <hr className={'border-slate-900 mt-5'} />
      {localStorage.getItem('role') === 'admin' && (
        <select
          value={targetWeek}
          onChange={(e) => setTargetWeek(e.target.value)}
        >
          <option value="1">My Fantasy Tribe | Week 1</option>
          <option value="2">My Fantasy Tribe | Week 2</option>
          <option value="3">My Fantasy Tribe | Week 3</option>
          <option value="4">My Fantasy Tribe | Week 4</option>
          <option value="5">My Fantasy Tribe | Week 5</option>
          <option value="6">My Fantasy Tribe | Week 6</option>
          <option value="7">My Fantasy Tribe | Week 7</option>
          <option value="8">My Fantasy Tribe | Week 8</option>
          <option value="9">My Fantasy Tribe | Week 9</option>
          <option value="10">My Fantasy Tribe | Week 10</option>
          <option value="11">My Fantasy Tribe | Week 11</option>
        </select>
      )}
      {myTribe ? (
        <div>
          <div className={'grid lg:grid-cols-8 grid-cols-4 gap-4 py-5'}>
            {stats.map((st) => {
              return (
                <StatBadge
                  key={`statbadge__${st[0]}`}
                  header={st[0]}
                  count={st[1].count}
                />
              );
            })}
          </div>

          <hr className={'border-slate-900 mb-5'} />

          <div className={'flex flex-row'}>
            <button
              onClick={() => setActiveTab('myTribe')}
              className={`${
                activeTab === 'myTribe'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded min-w-32 rounded-b-none text-sm`}
            >
              My Tribe Members
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded min-w-32 rounded-b-none text-sm`}
            >
              Tribe History
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`${
                activeTab === 'edit'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded min-w-32 rounded-b-none text-sm`}
            >
              Edit Tribe
            </button>
          </div>
          <div className={'bg-slate-700 p-2 rounded rounded-tl-none'}>
            {activeTab === 'myTribe' ? (
              <div>
                <div
                  className={
                    'grid lg:grid-cols-5 md:grid-cols-3 lg:gap-6 md:gap-3 gap-1 grid-cols-2 overflow-scroll'
                  }
                >
                  {myTribe &&
                    myTribe.length > 0 &&
                    myTribe.map((c) => {
                      return (
                        <CastawayCard
                          castaway={c}
                          allCastaways={castaways}
                          handleClick={null}
                          key={`myTribe__${c._id}`}
                        />
                      );
                    })}
                </div>
                {myTribe.length === 0 && (
                  <div className={'text-slate-300 font-bold text-center p-2'}>
                    Whoops! You haven't recruited any Castaways! Head over to
                    the Edit tab to get some!
                  </div>
                )}
              </div>
            ) : activeTab === 'edit' ? (
              <div>
                <div className={'text-slate-200 font-bold text-lg'}>
                  <span>
                    Use the Add or Drop buttons to update your active Tribe!
                  </span>
                  <br />
                  <span>Your Current Tribe</span>
                </div>
                <div
                  className={
                    'grid lg:grid-cols-5 md:grid-cols-3 lg:gap-6 md:gap-3 gap-1 grid-cols-2 overflow-scroll'
                  }
                >
                  {myTribe &&
                    myTribe.map((c) => {
                      return (
                        <CastawayCard
                          castaway={c}
                          handleClick={dropCastawayFromTeam}
                          key={`editTribe_myTribe__${c._id}`}
                        />
                      );
                    })}
                </div>
                <hr className="p-3" />
                <div className={'text-slate-200 font-bold text-lg'}>
                  <span>Available Castaways</span>
                </div>
                <div
                  className={
                    'grid lg:grid-cols-6 md:grid-cols-4 lg:gap-4 md:gap-2 gap-1 grid-cols-2 overflow-scroll'
                  }
                >
                  {loading ? (
                    <h1>Loading</h1>
                  ) : error ? (
                    <h1>Error: {error}</h1>
                  ) : (
                    castaways
                      .filter((c) => c.status !== 'eliminated')
                      .sort((a, b) => {
                        var textA = a.name.toUpperCase();
                        var textB = b.name.toUpperCase();
                        return textA < textB ? -1 : textA > textB ? 1 : 0;
                      })
                      .map((c) => (
                        <CastawayCard
                          castaway={c}
                          handleClick={addCastawayToTeam}
                          canAdd={true}
                          key={`editTribe_castaways__${c._id}`}
                        />
                      ))
                  )}
                </div>
              </div>
            ) : (
              <div>
                {!tribeHistory ||
                  (tribeHistory.length === 0 && (
                    <div
                      className={
                        'text-slate-300 lg:text-lg font-bold text-center'
                      }
                    >
                      No Tribe history yet. Check back next week!
                    </div>
                  ))}
                {tribeHistory &&
                  tribeHistory.map((t) => (
                    <div key={`my_tribe_history__${t._id}`}>
                      <span className={'text-slate-300 lg:text-lg font-bold'}>
                        Your Fantasy Tribe from week {t.week}
                      </span>
                      <div
                        className={
                          'grid lg:grid-cols-5 md:grid-cols-3 lg:gap-6 md:gap-3 gap-1 grid-cols-2 overflow-scroll'
                        }
                      >
                        {t.castaways.map((c) => {
                          return (
                            <CastawayCard
                              week={t.week}
                              castaway={c}
                              handleClick={null}
                              key={`tribe_history__${c._id}`}
                            />
                          );
                        })}
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
            )}
          </div>
          {localStorage.getItem('role') === 'admin' && (
            <button className={'boton-elegante'} onClick={freezeTribeCastaways}>
              Freeze All Tribes
            </button>
          )}
        </div>
      ) : (
        <div className={'text-center font-bold text-lg p-5'}>
          You don't have a Fantasy Tribe just yet!
          <br />
          No worries, create one with the button below:
          <hr className={'border-slate-900 m-5'} />
          <button className={'boton-elegante m-1'} onClick={createATribe}>
            Get a Tribe
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTribe;
