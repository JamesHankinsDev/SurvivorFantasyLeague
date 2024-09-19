export const TribeMemberCard = ({ castaway, handleClick }) => {
  return (
    <div className="rounded border-4 border-slate-300 w-full text-slate-300 text-center flex flex-col p-5 m-5 justify-center items-center">
      <div className={'flex flex-row'}>
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg bg-slate-300 rounded text-slate-900 px-5">
            {castaway.name}
          </div>
          <div className="text-sm  italic">{castaway.tribe}</div>
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
      _______
      <div className={'flex text-start flex-col'}>
        <h1 className={'text-sm p-1'}>Pts: ###</h1>
        <h1 className={'text-sm p-1'}>VA: ###</h1>
        <h1 className={'text-sm p-1'}>VF: ###</h1>
        <h1 className={'text-sm p-1'}>CW: ###</h1>
        <h1 className={'text-sm p-1'}>IW: ###</h1>
        <h1 className={'text-sm p-1'}>IF: ###</h1>
      </div>
    </div>
  );
};
