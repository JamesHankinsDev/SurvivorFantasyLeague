import { useState } from 'react';

import { Popover } from '@mui/material';

export const CastawayModalView = ({ castaway }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleModalClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModalClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div
        onClick={handleModalClick}
        className={`text-xs bg-slate-400 h-4 text-center hover:bg-slate-500 px-5 font-bold cursor-pointer text-slate-900`}
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
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'VF'
                  ).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'VA'
                  ).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'CW'
                  ).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'IW'
                  ).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'IF'
                  ).length
                }
              </td>
              <td>
                {
                  castaway.scoringEventIds.filter(
                    (sc) => sc.scoringEvent === 'TC'
                  ).length
                }
              </td>
            </tr>
          </tbody>
        </table>
      </Popover>
    </>
  );
};
