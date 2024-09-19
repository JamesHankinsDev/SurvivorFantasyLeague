export const TribeMemberCard = ({ castaway, handleClick }) => {
  const isEliminated = castaway.status === 'eliminated';
  return (
    <div className="rounded border-4 border-slate-300 w-full text-slate-300 text-center flex flex-col p-5 my-5 justify-center items-center">
      <div className={'flex flex-row'}>
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg bg-slate-300 rounded text-slate-900 px-5">
            {castaway.name}
          </div>
          <div
            className={`rounded p-1 mt-1 text-sm ${
              isEliminated
                ? 'bg-slate-300'
                : castaway.tribe === 'Lavo'
                ? 'bg-red-500'
                : castaway.tribe === 'Gata'
                ? 'bg-amber-400'
                : 'bg-blue-700'
            } italic`}
          >
            {castaway.tribe}
          </div>
        </div>
      </div>
      <img
        className={`rounded p-5 ${isEliminated && 'eliminated'}`}
        src={castaway.imageUrl}
        alt={castaway.name}
        style={{ width: '150px', height: 'auto' }}
      />
      <div className={'text-start grid grid-cols-3 gap-2'}>
        <h1 className={'text-sm'}>Pts: ###</h1>
        <h1 className={'text-sm'}>VA: ###</h1>
        <h1 className={'text-sm'}>VF: ###</h1>
        <h1 className={'text-sm'}>CW: ###</h1>
        <h1 className={'text-sm'}>IW: ###</h1>
        <h1 className={'text-sm'}>IF: ###</h1>
      </div>
      <div className="pl-5">
        <div className="flex flex-row">
          <button
            className="boton-elegante my-5"
            onClick={() => handleClick(castaway._id)}
          >
            Drop
          </button>
        </div>
      </div>
    </div>
  );
};
