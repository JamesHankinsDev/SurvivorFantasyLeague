import { useState } from 'react';

import { CastawayCard } from '../../components/CastawayCard';
import { useAuth } from '../../context/AuthContext';
import { useCastaways } from '../../context/CastawayContext';
import { API_URL } from '../../utils/constants';
import { usePostWithToast } from '../../hooks/usePostWithToast';

const Castaways = () => {
  const {
    cachedCastaways: castaways,
    loading,
    error,
    refetch,
  } = useCastaways();
  const { postData: postNewCastaway } = usePostWithToast(API_URL.CASTAWAY);
  const [newCastaway, setNewCastaway] = useState({
    name: '',
    tribe: '',
    season: '',
    imageUrl: '',
  });
  const { accessToken, userRole } = useAuth();

  const handleAddCastaway = async (e) => {
    e.preventDefault();
    await postNewCastaway('CASTAWAY_ADD', newCastaway, {
      headers: { Authorization: accessToken },
    })
      .finally(refetch)
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div className="flex flex-col max-h-full max-w-full">
      <div className={`text-xl font-bold text-slate-900`}>
        Meet the Castaways of Survivor Season 47!
      </div>
      <div className={`text-md text-slate-900`}>
        Use this page to explore the Castaways and their performance so far this
        season. You can see their total points at the top of the card in green,
        or click on "stats" to see a breakdown of their season.
      </div>
      <hr className={'border-slate-900 my-2'} />
      <div className={'flex flex-row flex-wrap justify-center items-center'}>
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : (
          castaways &&
          castaways.map((c) => (
            <CastawayCard
              castaway={c}
              handleClick={null}
              key={`castaways__${c._id}`}
            />
          ))
        )}
      </div>
      {userRole === 'admin' && (
        <>
          <form onSubmit={handleAddCastaway}>
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
    </div>
  );
};

export default Castaways;
