import { useEffect, useState } from 'react';
import { useScoring } from '../../context/ScoringContext';
import { RecapBar } from './components/RecapBar';

export const SeasonRecap = () => {
  const [weeklyScoring, setWeeklyScoring] = useState({});
  const { cachedScoring: scores, loading, error } = useScoring();

  useEffect(() => {
    if (scores && scores != []) {
      scores.forEach((sc) => {
        if (!weeklyScoring[`week_${sc.week}`]) {
          setWeeklyScoring((wksc) => ({
            ...wksc,
            [`week_${sc.week}`]: scores.filter((s) => s.week === sc.week),
          }));
        }
      });
    }
  }, [scores]);

  return (
    <>
      <h1>Weekly Recap!</h1>
      <h2>Coming soon.</h2>
      {loading ? (
        <h1>Loading</h1>
      ) : Object.entries(weeklyScoring) !== null &&
        Object.entries(weeklyScoring) !== 0 ? (
        Object.entries(weeklyScoring).map((s) => (
          <RecapBar scores={s} key={`${s[0]}`} />
        ))
      ) : (
        <></>
      )}
    </>
  );
};
