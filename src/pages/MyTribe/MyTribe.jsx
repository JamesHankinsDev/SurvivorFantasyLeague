import axios from 'axios';
import { useState } from 'react';
import { getAPIURI } from '../../utils/API';
import { useCastaways } from '../../context/CastawayContext';
import { MyTribeCastawayCards } from './components/MyTribeCastawayCards';
import { CastawayGrid } from './components/CastawayGrid';
import { CastawayModal } from './components/CastawayModal';
import { useFantasyTribes } from '../../context/FantasyTribeContext';

const MyTribe = () => {
  const [targetWeek, setTargetWeek] = useState(null);
  const [modalCastaway, setModalCastaway] = useState(null);

  const {
    cachedCastaways: castaways,
    loading: castawaysLoading,
    refetch: refetchCastaways,
  } = useCastaways();

  const {
    cachedMyTribe: myTribe,
    loading: tribesLoading,
    refetch: refetchMyTribe,
  } = useFantasyTribes();

  const freezeTribeCastaways = async () => {
    const BASE_URI = getAPIURI();
    await axios.post(
      `${BASE_URI}/api/team/freeze`,
      { targetWeek },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );

    refetchMyTribe();
  };

  // Create a Tribe
  const createATribe = async () => {
    const BASE_URI = getAPIURI();
    await axios.post(
      `${BASE_URI}/api/team`,
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    refetchMyTribe();
  };

  return (
    <div className="flex flex-col">
      {!modalCastaway ? (
        <></>
      ) : (
        <CastawayModal
          castaways={castaways}
          castaway={castaways.find((cs) => cs._id === modalCastaway)}
          resetModal={() => {
            refetchCastaways();
            setModalCastaway(false);
            refetchMyTribe();
          }}
          replaceableCastaways={(() =>
            myTribe.castaways.filter(
              (castaway) =>
                !myTribe.fantasyTribes[
                  myTribe.fantasyTribes.length - 1
                ].castaways
                  .map((el) => el._id)
                  .includes(castaway._id)
            ).length === 0
              ? myTribe.castaways
              : [myTribe.castaways[4]])()}
        />
      )}
      <div className={`md:text-xl text-md font-bold text-slate-900`}>
        Your Active Fantasy Tribe.
      </div>
      <hr className={'border-slate-900 my-5'} />
      <>
        {tribesLoading ? (
          <h1>Tribes are loading</h1>
        ) : (
          <MyTribeCastawayCards
            castaways={myTribe?.castaways}
            handleModal={setModalCastaway}
          />
        )}
        <hr className={'border-slate-900 my-5'} />
        {castawaysLoading ? (
          <h1>Castaways are Loading</h1>
        ) : tribesLoading ? (
          <h1>Tribes are Loading...</h1>
        ) : (
          <CastawayGrid
            castaways={castaways}
            myTribe={myTribe?.castaways}
            handleModal={setModalCastaway}
          />
        )}
      </>
      {!myTribe && !tribesLoading && (
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
      {localStorage.getItem('role') === 'admin' && (
        <>
          {localStorage.getItem('role') === 'admin' && (
            <select
              className={'md:block hidden'}
              value={targetWeek ?? 0}
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
  );
};

export default MyTribe;
