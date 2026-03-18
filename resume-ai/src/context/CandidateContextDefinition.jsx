import React, { createContext, useContext } from 'react';

export const CandidateContext = createContext();

export function useCandidates() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
}
