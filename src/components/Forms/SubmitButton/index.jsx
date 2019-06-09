import React from 'react';
import './styles';

type SubmitButtonProps = {
  disabled?: boolean,
  children?: any,
  intent?: string,
  className?: string,
};

class SubmitButton extends React.Component {
  props: SubmitButtonProps;
  render() {
    return (
      <button
        className={`${this.props.className || ''} SubmitButton pt-button ${this
          .props.intent || 'pt-intent-primary'}`}
        type="submit"
        disabled={this.props.disabled}
      >
        {this.props.children || 'Submit'}
      </button>
    );
  }
}

export default SubmitButton;
