import { CastawayCard } from '../../components/CastawayCard';
import { useAuth } from '../../context/AuthContext';
import { useCastaways } from '../../context/CastawayContext';
import { AddCastaway } from './components/AddCastaway';

const Castaways = () => {
  const { cachedCastaways: castaways, loading } = useCastaways();

  const { userRole } = useAuth();

  return (
    <div className="flex flex-col max-h-full max-w-full">
      <div className={`md:text-xl text-md font-bold text-slate-900`}>
        Meet the Castaways of Survivor Season 47!
      </div>
      <div className={`md:text-md text-sm text-slate-900`}>
        Use this page to explore the Castaways and their performance so far this
        season. You can see their total points at the top of the card in green,
        or click on "stats" to see a breakdown of their season.
      </div>
      <hr className={'border-slate-900 my-2'} />
      <div className={'flex flex-row flex-wrap justify-center items-center'}>
        {loading ? (
          <h1>Loading</h1>
        ) : castaways !== null && castaways.length !== 0 ? (
          castaways
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => a.status.localeCompare(b.status))
            .map((c) => (
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
        <div className={'hidden md:block'}>
          <AddCastaway />
        </div>
      )}
    </div>
  );
};

export default Castaways;
