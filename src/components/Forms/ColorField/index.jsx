import React from 'react';
import { Field } from 'redux-form';
import ColorInput from 'components/Forms/ColorInput';
import ContextHelp from 'components/ContextHelp';
import './styles.less';

type ColorFieldProps = {
  label: string, // display label
  name: string, // input name
  required?: boolean,
  placeholder?: string,
};

class ColorField extends React.Component {
  props: ColorFieldProps;
  render() {
    return (
      <div className="ColorField input-container">
        <label className="pt-label">
          <div className="FieldGroup">
            {this.props.label}
            {this.props.help && <ContextHelp id={this.props.id} />}
          </div>
        </label>
        <div className="pt-input-group">
          <Field
            required={this.props.required || false}
            component={props => <ColorInput {...props} />}
            name={this.props.name}
            type="text"
            placeholder={this.props.placeholder || ''}
          />
        </div>
      </div>
    );
  }
}

export default ColorField;
