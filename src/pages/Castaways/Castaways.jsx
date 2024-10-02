import { useEffect } from 'react';
import { CastawayCard } from '../../components/CastawayCard';
import { useAuth } from '../../context/AuthContext';
import { useCastaways } from '../../context/CastawayContext';
import { AddCastaway } from './components/AddCastaway';

const Castaways = () => {
  const { cachedCastaways: castaways, loading, error } = useCastaways();

  const { userRole } = useAuth();

  useEffect(() => {
    if (error) {
      console.error({ CastawaysError: error });
    }
  }, [error]);

  return (
    <div className="flex flex-col max-h-full max-w-full">
      <div className={`text-xl font-bold text-slate-900`}>
        Meet the Castaways of Survivor Season 47!
      </div>
      <div className={`text-md text-slate-900`}>
        Use this page to explore the Castaways and their performance so far this
        season. You can see their total points at the top of the card in green,
        or click on "stats" to see a breakdown of their season.
      </div>
      <hr className={'border-slate-900 my-2'} />
      <div className={'flex flex-row flex-wrap justify-center items-center'}>
        {loading ? (
          <h1>Loading</h1>
        ) : castaways !== null && castaways.length !== 0 ? (
          castaways.map((c) => (
            <CastawayCard
              castaway={c}
              handleClick={null}
              key={`castaways__${c._id}`}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      {userRole === 'admin' && (
        <>
          <AddCastaway />
        </>
      )}
    </div>
  );
};

export default Castaways;
