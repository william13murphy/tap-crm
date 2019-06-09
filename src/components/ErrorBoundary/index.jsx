import React from 'react';
import connect from 'src/redux/connect';
import { logError } from 'util/log';
import './styles.less';

type ErrorBoundaryProps = {
  children: React.DOMElement<any>,
  state: {},
};

class ErrorBoundary extends React.Component {
  props: ErrorBoundaryProps;

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

    // Log error to Console & Sentry
    const token = this.props.token.payload;
    logError(error, info, token);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="ErrorBoundary pt-callout pt-intent-danger">
          <span className="PostFailMessage__icon pt-icon-standard pt-icon-error pt-intent-danger" />
          <h4>An error has occurred. Please refresh the page to continue.</h4>
        </div>
      );
    }
    if (this.props.children) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    token: state.token,
  };
};

export default connect(
  ErrorBoundary,
  mapStateToProps
);
