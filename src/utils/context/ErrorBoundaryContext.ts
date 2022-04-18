import { createContext } from 'react';

type TErrorBoundaryContext = (error: Error) => void;

export const ErrorBoundaryContext = createContext<TErrorBoundaryContext>(
  () => {}
);
