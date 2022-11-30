/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { setError } from '../../redux/error/error.actions';
import { withRouter } from 'react-router';

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

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.hasError &&
      this.props.location !== '/error' &&
      previousProps.location !== this.props.location
    ) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch() {
    this.props.setError({ error: 'DEFAULT_ERROR' });
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

export default withRouter(connect(null, mapDispatchToProps)(ErrorBoundary));
