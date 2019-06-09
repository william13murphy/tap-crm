import React from 'react';

class TextInput extends React.Component {
  props: {
    intent?: 'success' | 'danger',
    iconPlacement?: 'left' | 'right',
  };
  getIconPlacement() {
    if (this.props.iconPlacement) {
      return 'icon-' + this.props.iconPlacement;
    }
  }
  getIntent() {
    if (this.props.intent) {
      return 'pt-intent-' + this.props.intent;
    }
  }
  render() {
    return (
      <input
        className={`pt-input ${this.getIntent()} ${this.getIconPlacement()}`}
        type="text"
      />
    );
  }
}

export default TextInput;
