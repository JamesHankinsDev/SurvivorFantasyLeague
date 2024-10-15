import * as React from 'react';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

import axios from 'axios';
import { getAPIURI } from '../utils/API';
import { useState } from 'react';
import { getCastawayTotalPoints } from '../utils/castawayUtils';
import { CastawayModalView } from './CastawayCardComponents';

export const CastawayCard = ({ castaway, week, handleClick, canAdd }) => {
  const viewOnlyCard = handleClick === null;
  const isEliminated = castaway.status === 'eliminated';

  const [isEditing, setIsEditing] = useState(false);
  const [editCastaway, setEditCastaway] = useState(castaway);

  const totalPoints = getCastawayTotalPoints(castaway, week);

  const updateCastaway = async () => {
    const BASE_URI = getAPIURI();
    try {
      await axios.put(
        `${BASE_URI}/api/admin/castaway/${editCastaway._id}`,
        editCastaway,
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      setEditCastaway(null);
      alert('Edit completed');
    } catch (err) {
      console.error({ edit: err });
      alert('Error updating castaway');
    }
  };

  return (
    <div
      className={`rounded border-slate-500 border-2 h-max my-2 md:w-36 w-28 mx-2 h-64 flex flex-col`}
    >
      {isEditing ? (
        <div className="flex flex-row">
          <input
            type="checkbox"
            id="eliminated-input"
            name="eliminated"
            value={'eliminated'}
            onChange={(e) => {
              setEditCastaway({
                ...editCastaway,
                status:
                  e.target.value === 'eliminated' ? 'eliminated' : 'active',
              });
            }}
          />
          <div>Is Eliminated</div>
        </div>
      ) : (
        <div
          className={`${!totalPoints ? 'hidden' : ''} 
          ${
            isEliminated
              ? 'bg-red-900 text-red-100'
              : 'bg-green-900 text-green-100'
          } flex justify-center items-center text-md text-center rounded-t font-bold w-full h-8 md:text-lg text-sm`}
        >
          {isEliminated
            ? 'Eliminated'
            : `${week ? `Week ${week}` : 'Total'} pts: ${totalPoints}`}
        </div>
      )}

      <CastawayModalView castaway={castaway} />

      <img
        className={`w-full ${isEliminated && 'eliminated z-0'}`}
        src={castaway.imageUrl}
        alt={castaway.name}
        style={{ width: 'auto', height: 'auto' }}
      />
      {isEditing ? (
        <div className={'form'}>
          <input
            className={'input'}
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setEditCastaway({ ...editCastaway, name: e.target.value })
            }
          />
          <span className={'input-border'}></span>
        </div>
      ) : (
        <div className="md:text-md text-sm text-center bg-slate-300 font-bold text-slate-900 px-5 md:h-12 h-10 flex justify-center items-center">
          {castaway.name}
        </div>
      )}
      {isEditing ? (
        <div className={'form'}>
          <input
            className={'input'}
            type="text"
            placeholder="Tribe"
            onChange={(e) =>
              setEditCastaway({ ...editCastaway, tribe: e.target.value })
            }
          />
          <span className={'input-border'}></span>
        </div>
      ) : (
        <div
          className={`px-5 text-center md:text-xl text-md font-bold ${
            castaway.tribe === 'Luvo'
              ? 'bg-red-700 text-red-200'
              : castaway.tribe === 'Gata'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-blue-800 text-blue-200'
          } ${viewOnlyCard && 'rounded-b'} italic`}
        >
          {castaway.tribe}
        </div>
      )}

      {!viewOnlyCard && (
        <button
          className={`w-full h-6 rounded-b font-bold ${
            canAdd
              ? 'bg-green-900 hover:bg-green-800 text-green-200'
              : 'hover:bg-red-800 bg-red-900 text-red-200'
          }`}
          onClick={() => handleClick(castaway._id)}
        >
          {canAdd && !isEliminated ? (
            <>
              Add <ArrowUpward />
            </>
          ) : (
            <>
              Drop <ArrowDownward />
            </>
          )}
        </button>
      )}
      {localStorage.getItem('role') === 'admin' && (
        <div className={'md:block hidden'}>
          <button
            className={`w-full rounded-b bg-slate-900 text-slate-200`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {!isEditing ? 'Edit' : 'Cancel'}
          </button>
          {isEditing && (
            <button
              className={`w-full rounded-b bg-slate-300 text-slate-900`}
              onClick={updateCastaway}
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
};
