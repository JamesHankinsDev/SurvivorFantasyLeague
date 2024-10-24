import axios from 'axios';
import { useEffect, useState } from 'react';
import { CastawayCard } from '../../components/CastawayCard';
import { getAPIURI } from '../../utils/API';
import { useCastaways } from '../../context/CastawayContext';
import { MyTribeCastawayCards } from './components/MyTribeCastawayCards';
import { CastawayGrid } from './components/CastawayGrid';

const MyTribe = () => {
  const [myTribe, setMyTribe] = useState([]);
  const [tribeHistory, setTribeHistory] = useState([]);
  const [targetWeek, setTargetWeek] = useState(null);
  const [activeTab, setActiveTab] = useState('myTribe');
  const [modalCastaway, setModalCastaway] = useState(null);

  useEffect(() => {
    const fetchMyTribe = async () => {
      const BASE_URI = getAPIURI();
      const response = await axios.get(`${BASE_URI}/api/team/myTeam`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      try {
        setMyTribe(response.data.castaways ?? null);
        setTribeHistory(response.data.fantasyTribes);
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
    // refetch,
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
      {!modalCastaway ? (
        <></>
      ) : (
        <CastawayModal
          castaways={castaways}
          castaway={castaways.find((cs) => cs._id === modalCastaway)}
          resetModal={() => setModalCastaway(false)}
          replaceableCastaways={(() => {
            console.log({
              myNewTribe: myTribe[4],
              myOldTribe: tribeHistory[tribeHistory.length - 1].castaways[4],
            });
            return myTribe[4]._id ===
              tribeHistory[tribeHistory.length - 1].castaways[4]._id
              ? myTribe
              : [myTribe[4]];
          })()}
        />
      )}
      <div className={`md:text-xl text-md font-bold text-slate-900`}>
        Your Active Fantasy Tribe.
      </div>
      <hr className={'border-slate-900 my-5'} />
      <>
        <MyTribeCastawayCards castaways={myTribe} />
        <hr className={'border-slate-900 my-5'} />
        <CastawayGrid
          castaways={castaways}
          myTribe={myTribe}
          handleModal={setModalCastaway}
        />
      </>
      {myTribe ? (
        <div>
          <hr className={'border-slate-900 my-5'} />

          <div className={'flex flex-row'}>
            <button
              onClick={() => setActiveTab('myTribe')}
              className={`${
                activeTab === 'myTribe'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded md:min-w-32 rounded-b-none text-sm`}
            >
              My Tribe Members
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded md:min-w-32 rounded-b-none text-sm`}
            >
              Tribe History
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`${
                activeTab === 'edit'
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-900 text-slate-100'
              } p-2 rounded md:min-w-32 rounded-b-none text-sm`}
            >
              Edit Tribe
            </button>
          </div>
          <div className={'bg-slate-700 md:p-2 rounded rounded-tl-none'}>
            {activeTab === 'myTribe' ? (
              <div>
                <div
                  className={
                    'flex flex-row flex-wrap justify-center items-center'
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
                <div
                  className={'text-slate-200 font-bold md:text-lg text-sm p-3'}
                >
                  <span>
                    Use the Add or Drop buttons to update your active Tribe!
                  </span>
                  <br />
                  <span>Your Current Tribe</span>
                </div>
                <div
                  className={
                    'flex flex-row flex-wrap justify-center items-center'
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
                    'flex flex-row flex-wrap justify-center items-center'
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
                  tribeHistory
                    .sort((a, b) => b.week - a.week)
                    .map((t) => (
                      <div key={`my_tribe_history__${t._id}`}>
                        <span
                          className={'text-slate-300 lg:text-lg font-bold p-3'}
                        >
                          Your Fantasy Tribe from week {t.week}
                        </span>
                        <div
                          className={
                            'flex flex-row flex-wrap justify-center items-center'
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
            <>
              {localStorage.getItem('role') === 'admin' && (
                <select
                  className={'md:block hidden'}
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
              <button
                className={'boton-elegante md:block hidden'}
                onClick={freezeTribeCastaways}
              >
                Freeze All Tribes
              </button>
            </>
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

const CastawayModal = ({ castaway, resetModal, replaceableCastaways }) => {
  console.log({ castaway, replaceableCastaways });
  return (
    <>
      <div
        className={
          'fixed top-0 left-0 bg-blue-300 h-screen w-screen z-index-0 opacity-45 flex justify-center items-center'
        }
        onClick={resetModal}
      ></div>
      <div
        className={
          'fixed top-0 left-0 h-screen w-screen z-index-0 flex justify-center items-center'
        }
      >
        <div className={'w-fit flex flex-row'} onClick={() => {}}>
          <div
            className={'w-full'}
            id={`my_tribe_castaway_card_${castaway._id}`}
          >
            <img
              className={`min-w-full rounded-tl-xl ${
                castaway.status === 'eliminated' && 'eliminated z-0'
              }`}
              src={castaway.imageMd}
              alt={castaway.name}
              style={{ width: 'auto', height: 'auto' }}
            />
            <h1
              className={
                'bg-slate-900 rounded-bl-xl px-2 md:text-lg text-xs text-right text-slate-200 font-bold'
              }
            >
              {castaway.name}
            </h1>
          </div>
          <div
            className={
              'flex flex-col bg-slate-300 w-full p-3 rounded-tr-xl rounded-br-xl justify-between'
            }
          >
            <div className={'flex flex-row w-full justify-end'}>
              <h1
                className={
                  'text-right p-1 bg-red-200 text-red-900 rounded-xl text-xs m-1 hover:cursor-pointer'
                }
                onClick={resetModal}
              >
                X
              </h1>
            </div>
            <div className={'flex flex-row w-full justify-between'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Tribe
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {castaway.tribe}
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Votes For
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'VF'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Votes Against
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'VA'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Challenge Wins
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'CW'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Immunity Wins
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'IW'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Idols Found
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'IF'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-slate-900 text-slate-300 grow text-lg font-bold underline italic'
                }
              >
                Tribal Councils
              </h1>
              <p className={'p-1 bg-slate-400 text-slate-900 grow text-right'}>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'TC'
                  ).length
                }
              </p>
            </div>
            <div className={'flex flex-row'}>
              <h1
                className={
                  'p-1 bg-green-200 text-green-900 grow text-lg text-center font-bold underline italic rounded-xl hover:cursor-pointer'
                }
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Add to Team!');
                }}
              >
                Add to Tribe
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
