import * as React from 'react';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Popover } from '@mui/material';
import axios from 'axios';
import { getAPIURI } from '../utils/API';

export const CastawayCard = ({ castaway, week, handleClick, canAdd }) => {
  const viewOnlyCard = handleClick === null;
  const isEliminated = castaway.status === 'eliminated';

  const [isEditing, setIsEditing] = React.useState(false);
  const [editCastaway, setEditCastaway] = React.useState(castaway);

  let totalPoints = castaway.scoringEventIds
    .filter((sc) => {
      if (week == null) {
        return true;
      }
      return sc.week === week;
    })
    .reduce((pts, sc) => (pts += sc.points), 0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleModalClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModalClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
      className={`rounded border-slate-500 border-2 w-full h-max my-2 w-1/6 mx-2 h-64 flex flex-col`}
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
      ) : isEliminated ? (
        <div className="bg-red-600 px-5 text-slate-900 rounded-t text-center font-bold grow">
          Eliminated
        </div>
      ) : (
        <div className={`text-md bg-green-900 px-5 rounded-t font-bold`}>
          {week ? `Week ${week} ` : 'Total '}Points: {totalPoints}
        </div>
      )}

      <div
        onClick={handleModalClick}
        className={`text-xs bg-slate-500 hover:bg-slate-700 px-5 font-bold cursor-pointer`}
      >
        View Stats
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleModalClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="pr-3">Week</th>
              <th className="pr-3">Votes For</th>
              <th className="pr-3">Votes Against</th>
              <th className="pr-3">Challenge Wins</th>
              <th className="pr-3">Immunity Wins</th>
              <th className="pr-3">Idols Found</th>
              <th className="pr-3">Tribal Councils</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'VF';
                  }).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'VA';
                  }).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'CW';
                  }).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'IW';
                  }).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'IF';
                  }).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter((sc) => {
                    return sc.week === 1 && sc.scoringEvent === 'TC';
                  }).length
                }
              </td>
            </tr>
          </tbody>
        </table>
      </Popover>

      <img
        className={`w-full ${isEliminated && 'eliminated'} `}
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
        <div className="lg:text-xl md:text-md text-center bg-slate-300 font-bold text-slate-900 px-5 grow">
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
          className={`px-5 text-center text-xl font-bold ${
            castaway.tribe === 'Luvo'
              ? 'bg-red-500'
              : castaway.tribe === 'Gata'
              ? 'bg-amber-400 text-slate-900'
              : 'bg-blue-700'
          } ${viewOnlyCard && 'rounded-b'} italic`}
        >
          {castaway.tribe}
        </div>
      )}

      {!viewOnlyCard && (
        <button
          className={`w-full rounded-b ${
            canAdd
              ? 'bg-green-200 hover:bg-green-600'
              : 'hover:bg-red-600 bg-red-200'
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
      {localStorage.getItem('role') === 'admin' &&
        (!isEditing && localStorage.getItem('role') === 'admin' ? (
          <button
            className={`w-full rounded-b bg-slate-900 text-slate-200`}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className={`w-full rounded-b bg-slate-900 text-slate-200`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>

            <button
              className={`w-full rounded-b bg-slate-300 text-slate-900`}
              onClick={updateCastaway}
            >
              Save
            </button>
          </>
        ))}
    </div>
  );
};
