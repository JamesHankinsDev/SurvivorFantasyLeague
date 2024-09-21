import { useEffect, useState } from 'react';

import axios from 'axios';
import { CastawayCard } from '../../components/CastawayCard';

const Castaways = () => {
  const [castaways, setCastaways] = useState([]);
  const [newCastaway, setNewCastaway] = useState({
    name: '',
    tribe: '',
    season: '',
    imageUrl: '',
  });
  useEffect(() => {
    const fetchCastaways = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/admin/castaways',
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      console.log({ res: response.data });

      const sortedCastaways = response.data.sort((a, b) => {
        var textA = a.tribe.toUpperCase();
        var textB = b.tribe.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      setCastaways(sortedCastaways);
    };
    fetchCastaways();
  }, []);

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
        {castaways.map((c) => (
          <CastawayCard
            castaway={c}
            handleClick={null}
            key={`castaways__${c._id}`}
          />
        ))}
      </div>
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
