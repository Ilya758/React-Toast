import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />,
  </ErrorBoundary>,
  document.getElementById('root')
);
