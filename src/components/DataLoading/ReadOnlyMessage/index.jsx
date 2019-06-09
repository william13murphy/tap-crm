import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

class ReadOnlyMessage extends React.Component {
  props: {
    errorMessage?: string,
  };
  render() {
    return (
      <div className="ReadOnlyMessage pt-callout pt-intent-warning">
        <span className="ReadOnlyMessage__icon pt-icon-standard pt-icon-warning-sign pt-intent-warning" />
        <h4>{this.props.errorMessage || 'This Form is Read Only.'}</h4>
      </div>
    );
  }
}

export default ReadOnlyMessage;
