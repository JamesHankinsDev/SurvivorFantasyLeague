import React, { createContext, useState, useContext, useEffect } from 'react';
import useFetchFantasyTribes from '../hooks/FantasyTribe/useFetchFantasyTribes';
import { enrichTribe } from '../utils/pointsHelper';

const FantasyTribesContext = createContext();

export const useFantasyTribes = () => {
  return useContext(FantasyTribesContext);
};

export const FantasyTribesProvider = ({ children }) => {
  const { allTribes, myTribe, loading, error } = useFetchFantasyTribes();

  const [cachedAllTribes, setCachedAllTribes] = useState([]);
  const [shouldRefetchAllTribes, setShouldRefetchAllTribes] = useState(true);

  const [cachedMyTribe, setCachedMyTribe] = useState(null);
  const [shouldRefetchMyTribe, setShouldRefetchMyTribe] = useState(true);

  useEffect(() => {
    if (
      (allTribes &&
        allTribes.length > 0 &&
        (!cachedAllTribes || cachedAllTribes.length === 0)) ||
      shouldRefetchAllTribes
    ) {
      const enrichedAllTribes = allTribes.map((tribe) => enrichTribe(tribe));
      setCachedAllTribes(enrichedAllTribes);
      setShouldRefetchAllTribes(false);
    }
  }, [allTribes, cachedAllTribes, shouldRefetchAllTribes]);

  useEffect(() => {
    if ((myTribe && !cachedMyTribe) || shouldRefetchMyTribe) {
      setCachedMyTribe(myTribe);
      setShouldRefetchMyTribe(false);
    }
  }, [myTribe, cachedMyTribe, shouldRefetchMyTribe]);

  const refetch = () => {
    setShouldRefetchAllTribes(true);
    setShouldRefetchMyTribe(true);
  };

  const value = {
    cachedAllTribes,
    cachedMyTribe,
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
