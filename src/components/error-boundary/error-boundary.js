/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../redux/error/error.actions';

import ErrorPage from '../../pages/error-page';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    const error = this.props.error;
    this.state = {
      hasError: error || false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    const setError = this.props.setError;
    setError({ error: 'DEFAULT_ERROR' });
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const hasError = this.state.hasError;
    return hasError ? <ErrorPage /> : children;
  }
}

const mapDispatchToProps = {
  setError
};

export default connect(null, mapDispatchToProps)(ErrorBoundary);
