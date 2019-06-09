import React from 'react';
import { logError } from 'util/log';
import './styles.less';

type FetchFailMessageProps = {
  name: string,
  error: {
    status: number,
    statusText: string,
    responseJSON?: {
      error: string,
    },
  },
  tryAgainCallback: any,
  tryAgainCallbackParams: any,
};

class FetchFailMessage extends React.Component {
  componentDidMount() {
    logError(this.props.error);
  }
  render() {
    let errorText = '';
    if (this.props.error && this.props.error.responseJSON) {
      errorText = this.props.error.responseJSON.error;
    }
    const errorStatus =
      this.props.error &&
      this.props.error.status &&
      this.props.error.status.toString();
    const errorStatusText = this.props.error && this.props.error.statusText;
    return (
      <div className="FetchFailMessage">
        <h5>There was an error fetching {this.props.name}</h5>
        <div>{`${errorStatus}: ${errorStatusText}`}</div>
        <div>{errorText}</div>
        <button
          onClick={() => {
            if (this.props.tryAgainCallbackParams) {
              this.props.tryAgainCallback(this.props.tryAgainCallbackParams);
            } else {
              this.props.tryAgainCallback();
            }
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
}

export default FetchFailMessage;
