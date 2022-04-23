import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryContext } from '../../utils/context/ErrorBoundaryContext';
import { IErrorBoundaryProps, IStateError } from './model';

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IStateError
> {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  triggerError = (error: Error) => {
    console.log(error);
    this.setState({
      hasError: true,
    });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h3>
          Sorry, something went wrong or you have forgotten to include a
          ToastContainer-component! Please, reload the page.
        </h3>
      );
    }

    return (
      <ErrorBoundaryContext.Provider value={this.triggerError}>
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
