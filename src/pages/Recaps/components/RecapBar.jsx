import { CastawayCard } from '../../../components/CastawayCard';

export const RecapBar = ({ scores }) => {
  const headerMap = {
    VF: 'Voted for the eliminated Castaway',
    VA: 'Received a vote to be sent home',
    CW: 'Challenge Winner',
    IW: 'Immunity Winner',
    IF: 'Found an Idol',
    EL: 'Eliminated',
    TC: 'Attended Tribal Council',
  };

  return (
    <div key={`${scores[0]}_recap`}>
      <h1 className={'text-2xl font-bold'}>{`Week ${
        scores[0].split('_')[1]
      }`}</h1>
      <h2>{headerMap.VF}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'VF')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
                week={scores[0].split('_')[1]}
              />
            );
          })}
      </div>
      <h2>{headerMap.VA}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'VA')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return arr.indexOf(arr.find((e) => e._id === sc._id)) !== i ? (
              <></>
            ) : (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
      <h2>{headerMap.CW}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'CW')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
      <h2>{headerMap.IW}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'IW')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
      <h2>{headerMap.IF}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'IF')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
      <h2>{headerMap.EL}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'EL')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
      <h2>{headerMap.TC}</h2>
      <div
        className={'flex flex-row flex-wrap justify-start items-center w-full'}
      >
        {scores[1]
          .filter((sca) => sca.scoringEvent === 'TC')
          .map((scb) => scb.castawayId)
          .map((sc, i, arr) => {
            return (
              <CastawayCard
                castaway={sc}
                handleClick={null}
                key={`myTribe__${sc._id}`}
              />
            );
          })}
      </div>
    </div>
  );
};
