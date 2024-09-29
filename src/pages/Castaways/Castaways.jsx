import { useState } from 'react';

import axios from 'axios';
import { CastawayCard } from '../../components/CastawayCard';
import { getAPIURI } from '../../utils/API';
import { useAuth } from '../../context/AuthContext';
import { useCastaways } from '../../context/CastawayContext';

const Castaways = () => {
  // const [castaways, setCastaways] = useState([]);
  const [newCastaway, setNewCastaway] = useState({
    name: '',
    tribe: '',
    season: '',
    imageUrl: '',
  });
  const { accessToken, userRole } = useAuth();
  const {
    cachedCastaways: castaways,
    loading,
    error,
    refetch,
  } = useCastaways();

  const addCastaway = async () => {
    const BASE_URI = getAPIURI();
    try {
      await axios.post(`${BASE_URI}/api/admin/castaway`, newCastaway, {
        headers: { Authorization: accessToken },
      });
      // setCastaways([...castaways, response.data]);
      refetch();
      setNewCastaway({ name: '', tribe: '', season: '' });
    } catch (error) {
      alert('Error adding castaway: ', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className={`text-xl font-bold text-slate-900`}>
        Meet the Castaways of Survivor Season 47!
      </div>
      <div className={`text-md text-slate-900`}>
        Use this page to explore the Castaways and their performance so far this
        season. You can see their total points at the top of the card in green,
        or click on "stats" to see a breakdown of their season.
      </div>
      <hr className={'border-slate-900 my-2'} />
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
