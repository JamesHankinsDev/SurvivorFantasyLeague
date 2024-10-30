import { useEffect, useState } from 'react';
import { getCastawayTotalPoints } from '../../../utils/castawayUtils';

const tableHeadCSS =
  'border border-slate-900 bg-slate-600 text-slate-300 text-left md:px-3 px-1 md:text-sm text-xs';
const tableRowCSS =
  'border border-slate-600 bg-slate-400 text-slate-900 px-3 text-xs';

export const CastawayGrid = ({ castaways = [], myTribe = [], handleModal }) => {
  const [castawaysForGrid, setCastawaysForGrid] = useState(castaways);
  const [sortBy, setSortBy] = useState('Castaway');
  const [hideEliminated, setHideEliminated] = useState(false);
  const [hideMyTribe, setHideMyTribe] = useState(false);

  useEffect(() => {
    if (castaways != null) {
      setCastawaysForGrid(() => {
        const ret = castaways
          .filter((cs) => !(hideEliminated && cs.status === 'eliminated'))
          .filter((cs) =>
            hideMyTribe
              ? !myTribe.map((cast) => cast._id).includes(cs._id)
              : true
          )
          .map((cs) => {
            return {
              name: cs.name,
              tribe: cs.tribe,
              status: cs.status,
              tribal_councils_survived: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'TC'
              ).length,
              vote_against: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'VF'
              ).length,
              votes_received: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'VA'
              ).length,
              challenge_wins: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'CW'
              ).length,
              immunity_idols: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'IF'
              ).length,
              immunity_wins: cs.scoringEventIds.filter(
                (scid) => scid.scoringEvent === 'IW'
              ).length,
              total_points: getCastawayTotalPoints(cs),
              isInTribe: myTribe.map((cas) => cas._id).includes(cs._id),
              _id: cs._id,
            };
          });

        return ret.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }, [castaways, myTribe, hideEliminated, hideMyTribe]);

  const handleFilterGrid = (a, b) => {
    switch (sortBy) {
      case 'Tribe':
        return a.tribe.localeCompare(b.tribe);
      case 'TribalCouncilsSurvived':
        return b.tribal_councils_survived - a.tribal_councils_survived;
      case 'VotesAgainstEliminatedCastaway':
        return b.vote_against - a.vote_against;
      case 'VotesReceivedforElimination':
        return b.votes_received - a.votes_received;
      case 'ChallengeWins':
        return b.challenge_wins - a.challenge_wins;
      case 'ImmunityIdolsFound':
        return b.immunity_idols - a.immunity_idols;
      case 'IndividualImmunitiesWon':
        return b.immunity_wins - a.immunity_wins;
      case 'TotalFantasyPointsthisSeason':
        return b.total_points - a.total_points;
      default:
        return a.name.localeCompare(b.name);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="hideEliminated" className={'text-xs px-2'}>
          Hide Eliminated Castaways
        </label>
        <input
          type="checkbox"
          id="hideEliminated"
          checked={hideEliminated}
          onChange={() => setHideEliminated(!hideEliminated)}
        />
      </div>
      <div>
        <label htmlFor="hideMyTribe" className={'text-xs px-2'}>
          Hide My Tribe
        </label>
        <input
          type="checkbox"
          id="hideMyTribe"
          checked={hideMyTribe}
          onChange={() => setHideMyTribe(!hideMyTribe)}
        />
      </div>
      <div>
        <label htmlFor="sortBy" className={'text-xs px-2'}>
          Sort Castaways By:
        </label>
        <select
          id="sortBy"
          className={'text-xs'}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Name">Castaway</option>
          <option value="Tribe">Tribe</option>
          <option value="TribalCouncilsSurvived">
            Tribal Councils Survived
          </option>
          <option value="VotesAgainstEliminatedCastaway">
            Votes Against Eliminated Castaway
          </option>
          <option value="VotesReceivedforElimination">
            Votes Received for Elimination
          </option>
          <option value="ChallengeWins">Challenge Wins</option>
          <option value="ImmunityIdolsFound">Immunity Idols Found</option>
          <option value="IndividualImmunitiesWon">
            Individual Immunities Won
          </option>
          <option value="TotalFantasyPointsthisSeason">
            Total Fantasy Points this Season
          </option>
        </select>
      </div>
      <div className="overflow-x-scroll md:overflow-x-hidden">
        <table className="table-auto border-collapse border border-slate-500 w-fit">
          <thead>
            <tr>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'NameA' ? 'Name' : 'NameA'));
                  }}
                >
                  Castaway
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) =>
                      curr === 'TribeA' ? 'TribeD' : 'TribeA'
                    );
                  }}
                >
                  Tribe
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'TCA' ? 'TCD' : 'TCA'));
                  }}
                >
                  Tribal Councils Survived
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'VFA' ? 'VFD' : 'VFA'));
                  }}
                >
                  Votes Against Eliminated Castaway
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'VRA' ? 'VRD' : 'VRA'));
                  }}
                >
                  Votes Received for Elimination
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'CWA' ? 'CWD' : 'CWA'));
                  }}
                >
                  Challenge Wins
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'IFA' ? 'IFD' : 'IFA'));
                  }}
                >
                  Immunity Idols Found
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'IWA' ? 'IWD' : 'IWA'));
                  }}
                >
                  Individual Immunities Won
                </div>
              </th>
              <th className={tableHeadCSS}>
                <div
                  onClick={() => {
                    setSortBy((curr) => (curr === 'TPA' ? 'TPD' : 'TPA'));
                  }}
                >
                  Total Fantasy Points this Season
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {castawaysForGrid.sort(handleFilterGrid).map((castaway) => (
              <tr key={`castaway_grid_${castaway._id}`}>
                <td className={tableRowCSS}>
                  <span
                    className={`underline text-blue-700 hover:cursor-pointer ${
                      castaway.status === 'eliminated' ? 'bg-red-300' : ''
                    }`}
                    onClick={() => {
                      handleModal(castaway._id);
                    }}
                  >
                    {castaway.name}
                  </span>
                </td>
                <td className={tableRowCSS}>
                  <span
                    className={`rounded-xl px-1 ${
                      castaway.tribe === 'Luvo'
                        ? 'bg-red-700 text-red-200'
                        : castaway.tribe === 'Gata'
                        ? 'bg-amber-400 text-amber-900'
                        : 'bg-blue-800 text-blue-200'
                    }`}
                  >
                    {castaway.tribe}
                  </span>
                </td>
                <td className={tableRowCSS}>
                  {castaway.tribal_councils_survived}
                </td>
                <td className={tableRowCSS}>{castaway.vote_against}</td>
                <td className={tableRowCSS}>{castaway.votes_received}</td>
                <td className={tableRowCSS}>{castaway.challenge_wins}</td>
                <td className={tableRowCSS}>{castaway.immunity_idols}</td>
                <td className={tableRowCSS}>{castaway.immunity_wins}</td>
                <td className={tableRowCSS}>{castaway.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
