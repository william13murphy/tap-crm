import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import ImageField from 'components/Forms/ImageField';
import SubmitButton from 'components/Forms/SubmitButton';

import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

type EditClientPictureFormProps = {
  userId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {};

  if (!values.PictureFile) {
    errors.PictureFile = 'Please upload a picture.';
  }

  return errors;
};

class EditClientPictureForm extends React.Component {
  props: EditClientPictureFormProps;
  onSubmit = formData => {
    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields: {
          headerString: string,
          imageString: string,
        } = base64StringToFields(base64ImageString);

        formData['LogoHeader'] = base64Fields.headerString;
        formData['Logo'] = base64Fields.imageString;
        log('onSubmit formData', formData);
        this.props.dispatchFormPost(formData);
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <ImageField label="Picture" name="PictureFile" required={true} />
        </InputBlock>
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const connectedEditClientPictureForm = connect(
  EditClientPictureForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-user', // a unique identifier for this form
  validate,
})(connectedEditClientPictureForm);
