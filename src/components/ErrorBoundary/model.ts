import { ErrorInfo, ReactNode } from 'react';

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IStateError {
  error: null | Error;
  errorInfo: null | ErrorInfo;
  hasError: boolean;
}
