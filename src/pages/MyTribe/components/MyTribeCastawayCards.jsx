export const MyTribeCastawayCards = ({ castaways = [], handleModal }) => {
  return (
    <div className={'w-full flex flex-row justify-center flex-wrap'}>
      {castaways.map((castaway) => (
        <div
          className={'md:w-48 w-24 mx-2 py-1 hover:cursor-pointer'}
          key={`my_tribe_castaway_card_${castaway._id}`}
          onClick={() => handleModal(castaway._id)}
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
