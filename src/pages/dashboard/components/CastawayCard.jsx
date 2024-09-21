import * as React from 'react';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { Popover } from '@mui/material';

export const CastawayCard = ({ castaway, handleClick, scoringRecords }) => {
  const isEliminated = castaway.status === 'eliminated';

  scoringRecords = scoringRecords.filter(
    (el) => el.castawayId === castaway._id
  );
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

  return (
    <div className={'rounded border-slate-300 border-2 w-full h-max my-2'}>
      <div className={`text-xs bg-green-900 px-5 font-bold`}>
        Points: {totalPoints}
      </div>

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
      <div className="text-sm bg-slate-300 font-bold text-slate-900 px-5">
        {castaway.name}
      </div>
      <div
        className={`px-5 text-xs font-bold ${
          castaway.tribe === 'Lavo'
            ? 'bg-red-500'
            : castaway.tribe === 'Gata'
            ? 'bg-amber-400 text-slate-900'
            : 'bg-blue-700'
        } italic`}
      >
        {castaway.tribe}
      </div>
      {isEliminated ? (
        <div className="bg-red-600 px-5 text-slate-900 text-center font-bold">
          Eliminated
        </div>
      ) : (
        <button
          className="w-full bg-slate-500 hover:bg-slate-600"
          onClick={() => handleClick(castaway._id)}
        >
          Add <ArrowUpward />
        </button>
      )}
    </div>
  );
};
