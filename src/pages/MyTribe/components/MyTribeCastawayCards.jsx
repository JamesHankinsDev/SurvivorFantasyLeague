export const MyTribeCastawayCards = ({ castaways }) => {
  return (
    <div
      className={
        'w-full flex flex-row justify-center hover:cursor-pointer flex-wrap'
      }
      onClick={() => console.log('Show Player Stats')}
    >
      {castaways.map((castaway) => (
        <div
          className={'md:w-48 w-24 px-2 py-1'}
          id={`my_tribe_castaway_card_${castaway._id}`}
        >
          <img
            className={`w-full rounded-t-xl ${
              castaway.status === 'eliminated' && 'eliminated z-0'
            }`}
            src={castaway.imageMd}
            alt={castaway.name}
            style={{ width: 'auto', height: 'auto' }}
          />
          <h1
            className={
              'bg-slate-900 rounded-b-xl px-2 md:text-lg text-xs text-right text-slate-200 font-bold'
            }
          >
            {castaway.name}
          </h1>
        </div>
      ))}
    </div>
  );
};
