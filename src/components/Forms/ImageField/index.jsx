import React from 'react';
import { Field } from 'redux-form';
import ValidatedFileInput from 'components/Forms/ValidatedFileInput';
import ImageDisplay from '../ImageDisplay';

const imageValidation = value => {
  return undefined; // valid
};

type ImageFieldProps = {
  label: string,
  required?: boolean,
  name: string,
  placeholder?: string,
  className?: string,
  imageFile: string,
};

class ImageField extends React.Component {
  props: ImageFieldProps;
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  render() {
    const imageDisplay = this.props.imageFile ? (
      <ImageDisplay
        imageFile={this.props.imageFile ? this.props.imageFile : ''}
      />
    ) : (
      ''
    );
    return (
      <label className={`ImageField pt-label ${this.props.className || ''} `}>
        {this.props.label}
        <div className="pt-input-group">
          {imageDisplay}
          <Field
            component={ValidatedFileInput}
            name={this.props.name}
            placeholder={this.props.placeholder || ''}
            required={this.props.required || false}
            validate={imageValidation}
          />
        </div>
      </label>
    );
  }
}

export default ImageField;
