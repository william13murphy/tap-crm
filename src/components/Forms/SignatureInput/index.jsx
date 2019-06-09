import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styleVariables from 'styles/_variables';
import './styles.less';

type SignatureInputProps = {
  input: {
    value: string,
    onChange: any,
  },
  clearButton: boolean, // Show clear button
};

class SignatureInput extends React.Component {
  props: SignatureInputProps;
  clear = () => {
    this.sigCanvas.clear();
  };
  handleSignatureEnd = e => {
    const dataURL = this.sigCanvas.toDataURL();
    this.props.input.onChange(dataURL);
  };
  componentDidMount() {
    // SignatureCanvas mounts twice for some reason, and it clears itself on mount.
    // So we pass the value to onChange when componentDidMount ¯\_(ツ)_/¯
    const dataURL = this.sigCanvas.toDataURL();
    this.props.input.onChange(dataURL);
  }
  render() {
    return (
      <div className="SignatureInput">
        <div>
          <div className="SignatureCanvas__container pt-card inline-block">
            <SignatureCanvas
              ref={ref => {
                this.sigCanvas = ref;
              }}
              onEnd={this.handleSignatureEnd}
              penColor={styleVariables.cyan_dark}
              canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
              clearOnResize={false}
            />
          </div>
        </div>
        {this.props.clearButton && (
          <button
            className="SignatureInput__ClearButton pt-button"
            onClick={this.clear}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default SignatureInput;
