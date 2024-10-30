import { useEffect, useState } from 'react';
import { getAPIURI } from '../../../utils/API';
import axios from 'axios';

export const CastawayModal = ({
  castaway,
  resetModal,
  replaceableCastaways,
}) => {
  const [castawayToAdd, setCastawayToAdd] = useState();
  const [castawayToReplace, setCastawayToReplace] = useState();

  const dropCastawayFromTeam = async (castaway) => {
    const castawayId = castaway._id;
    try {
      const BASE_URI = getAPIURI();
      await axios.post(
        `${BASE_URI}/api/team/drop/${castawayId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addCastawayToTeam = async (castaway) => {
    const castawayId = castaway._id;
    try {
      const BASE_URI = getAPIURI();
      await axios.post(
        `${BASE_URI}/api/team/add/${castawayId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (castawayToAdd && castawayToReplace) {
      const handleAPICalls = async () => {
        dropCastawayFromTeam(castawayToReplace)
          .then(async () => {
            await addCastawayToTeam(castawayToAdd);
          })
          .then(resetModal)
          .catch((error) => console.error(error));
      };

      handleAPICalls();
    }
  }, [castawayToAdd, castawayToReplace, resetModal]);

  const handleAddToTeam = () => {
    setCastawayToAdd(castaway);
  };
  return (
    <>
      <div
        className={
          'fixed top-0 left-0 bg-blue-300 h-screen w-screen z-index-0 opacity-45 flex justify-center items-center'
        }
        onClick={() => {
          resetModal();
          setCastawayToAdd(null);
          setCastawayToReplace(null);
        }}
      ></div>
      <div
        className={
          'fixed top-0 left-0 h-screen w-screen z-index-0 flex justify-center items-center'
        }
      >
        {castawayToAdd ? (
          <div className={'w-fit rounded-xl flex flex-row'} onClick={() => {}}>
            <div
              className={'w-fit h-fit'}
              id={`my_tribe_castaway_card_${castaway._id}`}
            >
              <img
                className={`rounded-tl-xl w-full ${
                  castaway.status === 'eliminated' && 'eliminated z-0'
                }`}
                src={castaway.imageMd}
                alt={castaway.name}
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
                'flex flex-col bg-slate-300 w-fit rounded-tr-xl rounded-br-xl justify-between'
              }
            >
              <div
                className={
                  'flex flex-row w-full justify-between bg-slate-900 rounded-tr-xl'
                }
              >
                <h1
                  className={
                    'text-right p-1 text-slate-100 rounded-xl text-xs m-1 hover:cursor-pointer'
                  }
                  onClick={() => {
                    setCastawayToAdd(null);
                  }}
                >
                  {'<'}
                </h1>
                <h1
                  className={
                    'text-right p-1 text-slate-100 rounded-xl text-xs m-1 hover:cursor-pointer'
                  }
                  onClick={() => {
                    resetModal();
                    setCastawayToAdd(null);
                    setCastawayToReplace(null);
                  }}
                >
                  X
                </h1>
              </div>
              <div
                className={'flex flex-row flex-wrap max-w-96 justify-center'}
              >
                {replaceableCastaways.map((castaway) => (
                  <div
                    className={
                      'flex flex-col p-2 rounded-xl hover:cursor-pointer'
                    }
                    id={`to_replace_${castaway._id}`}
                    onClick={() => setCastawayToReplace(castaway)}
                  >
                    <img
                      src={castaway.imageUrl}
                      alt={castaway.name}
                      className={'w-24 rounded-t-xl'}
                    />
                    <div
                      className={
                        'bg-slate-900 text-slate-300 p-1 rounded-b-xl flex-wrap w-24 text-xs'
                      }
                    >
                      {castaway.name}
                    </div>
                  </div>
                ))}
              </div>
              <h1
                className={
                  'bg-slate-900 text-red-600 w-full rounded-br-xl text-md py-1 px-3'
                }
              >
                Select a Castaway to replace with {castawayToAdd.name}
              </h1>
            </div>
          </div>
        ) : (
          <div
            className={'md:w-fit rounded-xl flex md:flex-row md:w-2/4 w-full'}
            onClick={() => {}}
          >
            <div
              className={'w-fit h-fit'}
              id={`my_tribe_castaway_card_${castaway._id}`}
            >
              <img
                className={`rounded-tl-xl w-full ${
                  castaway.status === 'eliminated' && 'eliminated z-0'
                }`}
                src={castaway.imageMd}
                alt={castaway.name}
              />
              <h1
                className={
                  'bg-slate-900 rounded-bl-xl px-2 md:text-lg text-xs text-right text-slate-200 font-bold w-full'
                }
              >
                {castaway.name}
              </h1>
            </div>
            <div
              className={
                'flex flex-col bg-slate-300 w-fit rounded-r-xl justify-between'
              }
            >
              <div
                className={
                  'flex flex-row w-full justify-end bg-slate-900 rounded-tr-xl'
                }
              >
                <h1
                  className={
                    'text-right p-1 text-slate-100 rounded-xl text-xs m-1 hover:cursor-pointer'
                  }
                  onClick={() => {
                    resetModal();
                    setCastawayToAdd(null);
                    setCastawayToReplace(null);
                  }}
                >
                  X
                </h1>
              </div>
              <div className={'text-sm md:text-lg'}>
                <div
                  className={'flex flex-row w-full justify-start items-start'}
                >
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Tribe:
                  </h1>
                  <span className={'p-1 text-slate-900'}>{castaway.tribe}</span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Votes For
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'VF'
                      ).length
                    }
                  </span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Votes Against
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'VA'
                      ).length
                    }
                  </span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Challenge Wins
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'CW'
                      ).length
                    }
                  </span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Immunity Wins
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'IW'
                      ).length
                    }
                  </span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Idols Found
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'IF'
                      ).length
                    }
                  </span>
                </div>
                <div className={'flex flex-row'}>
                  <h1
                    className={'p-1 text-slate-900  font-bold underline italic'}
                  >
                    Tribal Councils
                  </h1>
                  <span className={'p-1 text-slate-900'}>
                    {
                      castaway.scoringEventIds.filter(
                        (sc) => sc.scoringEvent === 'TC'
                      ).length
                    }
                  </span>
                </div>
              </div>
              <div className={'flex flex-row'}>
                {replaceableCastaways
                  .map((el) => el._id)
                  .includes(castaway._id) ? (
                  <></>
                ) : (
                  <h1
                    className={
                      'p-1 bg-slate-900 text-green-300 w-full text-center font-bold underline italic rounded-br-xl hover:cursor-pointer'
                    }
                    onClick={handleAddToTeam}
                  >
                    Add to Tribe
                  </h1>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
