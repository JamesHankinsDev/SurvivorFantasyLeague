import React, { createContext, useState, useContext, useEffect } from 'react';
import useFetchCastaways from '../hooks/Castaways/useFetchCastaways';

const CastawayContext = createContext();

export const useCastaways = () => {
  return useContext(CastawayContext);
};

export const CastawaysProvider = ({ children }) => {
  const { data: castaways, loading, error } = useFetchCastaways();

  const [cachedCastaways, setCachedCastaways] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    if ((castaways && !cachedCastaways) || shouldRefetch) {
      setCachedCastaways(castaways);
      setShouldRefetch(false);
    }
  }, [castaways, cachedCastaways, shouldRefetch]);

  const refetch = () => setShouldRefetch(true);

  const value = {
    cachedCastaways,
    loading,
    error,
    refetch,
  };

  return (
    <CastawayContext.Provider value={value}>
      {children}
    </CastawayContext.Provider>
  );
};
