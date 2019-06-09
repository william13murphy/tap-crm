import React from 'react';
import { Field } from 'redux-form';
import SignatureInput from 'components/Forms/SignatureInput';
import './styles.less';

type SignatureFieldProps = {
  label: string, // display label
  name: string, // input name
  required?: boolean,
  placeholder?: string,
};

class SignatureField extends React.Component {
  props: SignatureFieldProps;
  render() {
    return (
      <div className="SignatureField-input-container">
        <label className="pt-label">{this.props.label}</label>
        <div className="pt-input-group">
          <Field
            required={this.props.required || false}
            component={props => <SignatureInput {...props} />}
            name={this.props.name}
            type="text"
            placeholder={this.props.placeholder || ''}
          />
        </div>
      </div>
    );
  }
}

export default SignatureField;
