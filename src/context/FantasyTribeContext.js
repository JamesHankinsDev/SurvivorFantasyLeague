import React, { createContext, useState, useContext, useEffect } from 'react';
import useFetchFantasyTribes from '../hooks/FantasyTribes/useFetchFantasyTribes';

const FantasyTribesContext = createContext();

export const useFantasyTribes = () => {
  return useContext(FantasyTribesContext);
};

export const FantasyTribesProvider = ({ children }) => {
  const { data: fantasyTribes, loading, error } = useFetchFantasyTribes();

  const [cachedFantasyTribes, setCachedFantasyTribes] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if ((fantasyTribes && !cachedFantasyTribes) || shouldRefetch) {
      setCachedFantasyTribes(fantasyTribes);
      setShouldRefetch(false);
    }
  }, [fantasyTribes, cachedFantasyTribes, shouldRefetch]);

  const refetch = () => setShouldRefetch(true);

  const value = {
    cachedFantasyTribes,
    loading,
    error,
    refetch,
  };

  return (
    <FantasyTribesContext.Provider value={value}>
      {children}
    </FantasyTribesContext.Provider>
  );
};
