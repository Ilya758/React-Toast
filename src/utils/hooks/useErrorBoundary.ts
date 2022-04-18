import { useContext } from 'react';
import { ErrorBoundaryContext } from '../context/ErrorBoundaryContext';

export const useErrorBoundary = () => {
  return {
    triggerError: useContext(ErrorBoundaryContext),
  };
};
