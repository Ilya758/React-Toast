import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
