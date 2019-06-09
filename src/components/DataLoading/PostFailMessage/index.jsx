import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

class PostFailMessage extends React.Component {
  props: {
    name: string,
    error: {
      status: number,
      statusText: string,
      responseText: string,
      responseJSON: {
        ModelState?: {},
      },
    },
    errorMessage?: string,
    tryAgainCallback: any,
    retryLink?: string,
    retryMessage?: string,
  };
  renderFieldErrors() {
    if (this.props.error && this.props.error.responseJSON) {
      if (this.props.error.responseJSON.ModelState) {
        const modelState = this.props.error.responseJSON.ModelState;
        return (
          <div>
            {Object.keys(modelState).map((cV, i) => {
              return (
                <div key={i}>
                  {cV}: {modelState[cV]}
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div>
            <div>{`${this.props.error.status.toString()}: ${
              this.props.error.statusText
            }`}</div>
            <div>{this.props.error.responseText}</div>
          </div>
        );
      }
    }
  }
  render() {
    return (
      <div className="PostFailMessage pt-callout pt-intent-danger">
        <span className="PostFailMessage__icon pt-icon-standard pt-icon-error pt-intent-danger" />
        <h4>{this.props.errorMessage || 'An error has occurred.'}</h4>
        {this.renderFieldErrors()}
        {this.props.retryLink && (
          <Link className="pt-button" to={this.props.retryLink}>
            {this.props.retryMessage}
          </Link>
        )}
      </div>
    );
  }
}

export default PostFailMessage;
