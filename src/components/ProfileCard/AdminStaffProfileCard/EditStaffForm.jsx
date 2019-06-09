import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import DateField from 'components/Forms/DateField';
import EmailField from 'components/Forms/EmailField';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import EFCStaffRoleSelectField from 'components/Forms/ConnectedFields/EFCStaffRoleSelectField';
import ImageField from 'components/Forms/ImageField';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { log } from 'log';

type EditStaffFormProps = {
  id: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: {
      UserId: string,
    },
  },
  schoolId: string,
  initialValues: {
    User: {
      Profile: {
        Dob: string,
      },
    },
  },
};

const validate = values => {
  const errors = {
    User: {
      Profile: {},
    },
  };

  if (!values.User) {
    values.User = { Profile: {} };
  }

  if (!values.Role) {
    errors.Role = 'Please enter a Role.';
  }
  if (!values.SchoolId) {
    errors.SchoolId = 'Please enter a School.';
  }
  if (values && values.User) {
    if (!values.User.Email) {
      errors.User.Email = 'Please enter an Email Address.';
    }

    if (values.User.Profile) {
      if (!values.User.Profile.FirstName) {
        errors.User.Profile.FirstName = 'Please enter a First Name.';
      }
      if (!values.User.Profile.LastName) {
        errors.User.Profile.LastName = 'Please enter a Last Name.';
      }

      if (!values.User.Profile.CountryId) {
        errors.User.Profile.CountryId = 'Please enter a Country.';
      }
    }
  }

  return errors;
};

class EditStaffForm extends React.Component {
  props: EditStaffFormProps;
  onSubmit = formData => {
    if (!formData.User) {
      formData.User = { Profile: {} };
    }

    const EfcUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'EFC'
    ).Id;

    formData.CreatedOn = moment().format('YYYY-MM-DD');
    formData.CreatedBy = this.props.token.payload.UserId;
    formData.Claims = [{ ClaimValue: formData.Claims[0].ClaimValue }];
    formData.Profile.UserTypeId = EfcUserTypeId;
    formData.UserName = formData.Email;
    formData.Password = 'tempPass!!11';
    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        formData.Profile.PictureHeader = base64Fields.headerString;
        formData.Profile.Picture = base64Fields.imageString;
        delete formData.PictureFile;
        log('onSubmit formData >>>', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('onSubmit formData >>>', formData);
      this.props.dispatchFormPost(formData);
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <EFCStaffRoleSelectField
            name="Claims[0].ClaimValue"
            label="Select Role*"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="First Name*"
            name="Profile.FirstName"
            required={true}
          />
          <TextField
            label="Last Name*"
            name="Profile.LastName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Phone*" name="PhoneNumber" required={true} />
          <EmailField label="Email*" name="Email" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
          <TextField label="Title" name="Profile.Title" />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Country*"
            name="Profile.CountryId"
            placeholder="Select Address Type"
            referenceOptions="LstCountries"
            required={true}
          />
          <DateField
            dob
            label="Date of Birth*"
            name="Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <ImageField label="Picture" name="PictureFile" required={true} />
        </InputBlock>
        <div className="FormButtonsContainer">
          {/*<SubmitButton disabled={pristine || submitting}>*/}
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    data: state.school.contact,
    references: state.utility.references,
  };
};

const connectedAddSchoolStaffForm = connect(
  EditStaffForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-staff', // a unique identifier for this form
  validate,
})(connectedAddSchoolStaffForm);
