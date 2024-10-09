export const StatBadge = ({ header, count }) => {
  const headerMap = {
    PTS: 'Total Points',
    VF: 'Votes For',
    VA: 'Votes Against',
    CW: 'Challenge Wins',
    IW: 'Immunity Wins',
    IF: 'Idols Found',
    EL: 'Eliminations',
    TC: 'Tribal Councils',
  };

  return (
    <div
      className={
        'bg-slate-500 text-slate-900 rounded text-center font-bold my-1 md:w-20 w-18 md:h-24 h-20 flex flex-col'
      }
    >
      <div
        className={'bg-slate-900 text-slate-200 rounded-t p-1 text-xs grow-0'}
      >
        {headerMap[header]}
      </div>
      <div
        className={
          'md:text-4xl text-3xl grow-2 grow flex justify-center items-center'
        }
      >
        {count}
      </div>
    </div>
  );
};
