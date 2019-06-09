import React from 'react';
import './styles.less';

class PostSuccessMessage extends React.Component {
  props: {
    message: string,
  };
  render() {
    return (
      <div className="PostSuccessMessage">
        <span className="PostSuccessMessage__icon pt-icon-standard pt-icon-tick-circle pt-intent-success" />
        <h2 className="PostSuccessMessage__title">Success!</h2>
        <h5 className="PostSuccessMessage__description">
          {this.props.message} has been posted.
        </h5>
      </div>
    );
  }
}

export default PostSuccessMessage;
