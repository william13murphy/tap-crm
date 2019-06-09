import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import ImageField from 'components/Forms/ImageField';
import SubmitButton from 'components/Forms/SubmitButton';

import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

type EditSchoolPictureFormProps = {
  schoolId: string,
  userId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      SchoolId: string,
    },
  },
};

const validate = values => {
  const errors = {};

  if (!values.PictureFile) {
    errors.PictureFile = 'Please upload a picture.';
  }

  return errors;
};

class EditSchoolPictureForm extends React.Component {
  props: EditSchoolPictureFormProps;
  onSubmit = formData => {
    // Delete nested data to make the POST faster:
    delete formData.Addresses;
    delete formData.Bank;
    delete formData.Contacts;
    delete formData.Marketings;
    delete formData.Purchases;
    delete formData.Rates;
    delete formData.Styles;
    delete formData.LogoBlobUrl;

    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);
        formData.Logo = base64Fields.imageString;
        formData.LogoHeader = base64Fields.headerString;

        delete formData.PictureFile;
        log('onSubmit formData', JSON.stringify(formData));
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
  return {
    token: state.token,
  };
};

const connectedAddSchoolPictureForm = connect(
  EditSchoolPictureForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-user', // a unique identifier for this form
  validate,
})(connectedAddSchoolPictureForm);
