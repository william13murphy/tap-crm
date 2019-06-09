import React from 'react';
import { CompactPicker } from 'react-color';
import ColorDisplay from 'components/ColorDisplay';
import './styles.less';

// Values required by redux-form for ColorInput
type ColorInputProps = {
  input: {
    value: string,
    onChange: any,
  },
};

class ColorInput extends React.Component {
  props: ColorInputProps;
  render() {
    const colorValues = [
      '#000000',
      '#4D4D4D',
      '#FFFFFF',
      '#F44E3B',
      '#A2449C',
      '#FC890B',
      '#FAEE08',
      '#66AA33',
      '#A4DD00',
      '#7D4C11',
      '#224297',
      '#0087C7',
      '#FE6BB1',
      '#C8A164',
      '#E3E7E8',
      '#EEBF77',
      '#877D7C',
    ];
    return (
      <div className="ColorInput">
        <ColorDisplay color={this.props.input.value} />
        <CompactPicker
          color={this.props.input.value}
          colors={colorValues}
          onChangeComplete={param => this.props.input.onChange(param.hex)}
        />
      </div>
    );
  }
}

export default ColorInput;
