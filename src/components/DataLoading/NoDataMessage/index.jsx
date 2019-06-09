import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

class NoDataMessage extends React.Component {
  props: {
    errorMessage?: string,
    icon?: string,
  };
  render() {
    return (
      <div className="NoDataMessage pt-callout">
        <span
          className={`NoDataMessage__icon pt-icon-standard ${
            this.props.icon ? this.props.icon : 'pt-icon-disable'
          }`}
        />
        <h4>{this.props.errorMessage || 'No Data Found.'}</h4>
      </div>
    );
  }
}

export default NoDataMessage;
