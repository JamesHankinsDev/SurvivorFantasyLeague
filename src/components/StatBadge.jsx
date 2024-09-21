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
      className={'bg-slate-500 text-slate-900 rounded text-center font-bold'}
    >
      <div className={'bg-slate-900 text-slate-200 rounded-t p-1'}>
        {headerMap[header]}
      </div>
      <div className={'text-5xl p-2'}>{count}</div>
    </div>
  );
};
