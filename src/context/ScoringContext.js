import { createContext, useContext, useEffect, useState } from 'react';
import useFetchScoring from '../hooks/Scores/useFetchScoring';

const ScoringContext = createContext();

export const useScoring = () => {
  return useContext(ScoringContext);
};

export const ScoringProvider = ({ children }) => {
  const { data: scores, loading, error } = useFetchScoring();

  const [cachedScoring, setCachedScoring] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if ((scores && !cachedScoring) || shouldRefetch) {
      setCachedScoring(scores);
      setShouldRefetch(false);
    }
  }, [scores, cachedScoring, shouldRefetch]);

  const refetch = () => setShouldRefetch(true);

  const value = {
    cachedScoring,
    loading,
    error,
    refetch,
  };

  return (
    <ScoringContext.Provider value={value}>{children}</ScoringContext.Provider>
  );
};
