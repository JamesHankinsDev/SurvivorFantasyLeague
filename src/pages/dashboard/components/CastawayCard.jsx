import axios from 'axios';
import { useState } from 'react';

export const CastawayCard = ({
  castaway,
  handleClick,
  setCastaways,
  castaways,
}) => {
  const [editCastaway, setEditCastaway] = useState(null);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const updateCastaway = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/castaway/${editCastaway._id}`,
        editCastaway,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      setCastaways(
        castaways.map((c) => (c._id === response.data._id ? response.data : c))
      );
      setEditCastaway(null);
    } catch (err) {
      console.error('error');
      alert('Error updating castaway');
    }
  };
  const deleteCastaway = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/castaway/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setCastaways(castaways.filter((c) => c._id !== id));
    } catch (err) {
      alert('Error deleting castaway');
    }
  };

  return (
    <div className="rounded bg-slate-300 w-max text-slate-900 text-center flex flex-row p-5 m-5">
      <div className="flex flex-col justify-center items-center">
        {editCastaway && editCastaway._id === castaway._id ? (
          <div>
            <div className={'form bg-slate-900 rounded'}>
              <input
                className="input"
                type="text"
                value={editCastaway?.name}
                onChange={(e) =>
                  setEditCastaway({ ...editCastaway, name: e.target.value })
                }
              />
              <span className={'input-border'}></span>
            </div>
            <div className={'form bg-slate-900 rounded'}>
              <input
                className="input"
                type="text"
                value={editCastaway?.tribe}
                onChange={(e) =>
                  setEditCastaway({ ...editCastaway, tribe: e.target.value })
                }
              />
              <span className={'input-border'}></span>
            </div>
            <div className={'form bg-slate-900 rounded'}>
              <input
                className="input"
                type="number"
                value={editCastaway?.season}
                onChange={(e) =>
                  setEditCastaway({ ...editCastaway, season: e.target.value })
                }
              />
              <span className={'input-border'}></span>
            </div>
            <div className={'form bg-slate-900 rounded'}>
              <input
                className="input"
                type="text"
                placeholder="status"
                value={editCastaway?.status}
                onChange={(e) =>
                  setEditCastaway({ ...editCastaway, status: e.target.value })
                }
              />
              <span className={'input-border'}></span>
            </div>
            <button className="boton-elegante m-5" onClick={updateCastaway}>
              Save
            </button>
            <button
              className="boton-elegante m-5"
              onClick={() => setEditCastaway(null)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="text-lg bg-slate-900 rounded text-slate-300 px-5">
              {castaway.name}
            </div>
            <div className="text-sm  italic">{castaway.tribe}</div>
            <div className="flex flex-row">
              <button
                className="boton-elegante my-5"
                onClick={() => handleClick(castaway._id)}
              >
                Add
              </button>
              {isAdmin && (
                <button
                  className="boton-elegante my-5"
                  onClick={() => setEditCastaway(castaway)}
                >
                  Edit
                </button>
              )}
              {isAdmin && (
                <button
                  className="boton-elegante my-5"
                  onClick={() => deleteCastaway(castaway._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <img
        className={'rounded pl-5'}
        src={castaway.imageUrl}
        alt={castaway.name}
        style={{ width: '150px', height: 'auto' }}
      />
    </div>
  );
};
