import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import EmailField from 'components/Forms/EmailField';
import ImageField from 'components/Forms/ImageField';
import TextField from 'components/Forms/TextField';
import DateField from 'components/Forms/DateField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';

import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';
type UpdateUserProfileFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
};

const validate = values => {
  const errors = {
    Profile: {},
  };
  if (!values.Profile.FirstName) {
    errors.Profile.FirstName = 'Please enter your First name.';
  }
  if (!values.Profile.LastName) {
    errors.Profile.LastName = 'Please enter your Last Name.';
  }
  return errors;
};

class UpdateUserProfileForm extends React.Component {
  props: UpdateUserProfileFormProps;
  onSubmit = formData => {
    delete formData.confirmEmail;

    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        formData.Profile.PictureHeader = base64Fields.headerString;
        formData.Profile.Picture = base64Fields.imageString;
        delete formData.PictureFile;
        log('onSubmit formData', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('Submit formData: ', formData);
      this.props.dispatchFormPost(formData);
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="PUT">
        <InputBlock>
          <TextField
            label="First Name"
            name="Profile.FirstName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Last Name"
            name="Profile.LastName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Title" name="Profile.Title" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Preferred Name (Optional)"
            name="Profile.PrefferedName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <DateField
            dob
            label="Date of Birth"
            name="Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Phone Number" name="PhoneNumber" required={true} />
        </InputBlock>
        <InputBlock>
          <EmailField label="Email" name="Email" required={true} />
        </InputBlock>
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

export default reduxForm({
  form: 'update-user-profile', // a unique identifier for this form
  validate,
})(UpdateUserProfileForm);
