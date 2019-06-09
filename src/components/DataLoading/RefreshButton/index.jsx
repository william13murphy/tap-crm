import React from 'react';

class RefreshButton extends React.Component {
  props: {
    refresh: any,
    disabled: boolean,
  };
  render() {
    return (
      <button
        disabled={this.props.disabled ? true : false}
        className="RefreshButton pt-button pt-button-square pt-icon-refresh"
        onClick={this.props.refresh}
      />
    );
  }
}

export default RefreshButton;
