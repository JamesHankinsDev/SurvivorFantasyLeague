import * as React from 'react';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Popover } from '@mui/material';
import axios from 'axios';

export const CastawayCard = ({ castaway, handleClick, canAdd }) => {
  const viewOnlyCard = handleClick === null;
  const isEliminated = castaway.status === 'eliminated';

  const [scoringRecords, setScoringRecords] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editCastaway, setEditCastaway] = React.useState(castaway);

  React.useEffect(() => {
    const fetchScoringRecords = async () => {
      const response = await axios.get('http://localhost:5000/api/scoring', {
        headers: { Authorization: localStorage.getItem('token') },
      });

      setScoringRecords(
        response.data.filter((el) => el.castawayId === castaway._id)
      );
    };
    fetchScoringRecords();
  }, []);

  const totalPoints = scoringRecords.reduce((pts, sc) => pts + sc.points, 0);

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
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/castaway/${editCastaway._id}`,
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

  const deleteCastaway = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/castaway/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('deleted.');
    } catch (err) {
      alert('Error deleting castaway');
    }
  };

  return (
    <div className={`rounded border-slate-500 border-2 w-full h-max my-2`}>
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
        <div className="bg-red-600 px-5 text-slate-900 rounded-t text-center font-bold">
          Eliminated
        </div>
      ) : (
        <div className={`text-md bg-green-900 px-5 rounded-t font-bold`}>
          Points: {totalPoints}
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
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
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
        <div className="lg:text-xl md:text-md text-center bg-slate-300 font-bold text-slate-900 px-5">
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
            castaway.tribe === 'Lavo'
              ? 'bg-red-500'
              : castaway.tribe === 'Gata'
              ? 'bg-amber-400 text-slate-900'
              : 'bg-blue-700'
          } ${viewOnlyCard && 'rounded-b'} italic`}
        >
          {castaway.tribe}
        </div>
      )}

      {!viewOnlyCard && !isEliminated && (
        <button
          className={`w-full rounded-b ${
            canAdd
              ? 'bg-green-200 hover:bg-green-600'
              : 'hover:bg-red-600 bg-red-200'
          }`}
          onClick={() => handleClick(castaway._id)}
        >
          {canAdd ? (
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
      {localStorage.getItem('role') === 'admin' && !isEditing ? (
        <button
          className={`w-full rounded-b bg-slate-900 text-slate-200`}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      ) : (
        <button
          className={`w-full rounded-b bg-slate-900 text-slate-200`}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      )}
      {isEditing && (
        <button
          className={`w-full rounded-b bg-slate-300 text-slate-900`}
          onClick={updateCastaway}
        >
          Save
        </button>
      )}
    </div>
  );
};
