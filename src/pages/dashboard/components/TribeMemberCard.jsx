export const TribeMemberCard = ({ castaway, handleClick, scoringRecords }) => {
  const isEliminated = castaway.status === 'eliminated';

  scoringRecords = scoringRecords.filter(
    (el) => el.castawayId === castaway._id
  );
  const totalPoints = scoringRecords.reduce((pts, sc) => pts + sc.points, 0);

  return (
    <div className={'rounded border-slate-300 border-2 w-full h-max my-2'}>
      <div className={`text-xs bg-green-900 px-5 font-bold`}>
        Points: {totalPoints}
      </div>

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
          isEliminated
            ? 'bg-slate-300'
            : castaway.tribe === 'Lavo'
            ? 'bg-red-500'
            : castaway.tribe === 'Gata'
            ? 'bg-amber-400 text-slate-900'
            : 'bg-blue-700'
        } italic`}
      >
        {castaway.tribe}
      </div>
      <button
        className="w-full bg-slate-500 hover:bg-slate-600"
        onClick={() => handleClick(castaway._id)}
      >
        Drop
      </button>
    </div>
  );
};
