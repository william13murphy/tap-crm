import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { reduxForm } from 'redux-form';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { base64StringToFields, imageToBase64String } from 'util/base64';

import DateField from 'components/Forms/DateField';
import EmailField from 'components/Forms/EmailField';
import ImageField from 'components/Forms/ImageField';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import SwitchField from 'components/Forms/SwitchField';
import TextField from 'components/Forms/TextField';
import SchoolStaffRoleSelectField from 'components/Forms/ConnectedFields/SchoolStaffRoleSelectField';
import { log } from 'log';

type AddSchoolStaffFormProps = {
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
      if (!values.User.Profile.GenderId) {
        errors.User.Profile.GenderId = 'Please Select a Gender.';
      }
      if (!values.User.Profile.CountryId) {
        errors.User.Profile.CountryId = 'Please enter a Country.';
      }
      if (!values.User.Profile.PhoneNumber) {
        errors.User.Profile.PhoneNumber = 'Please enter a Phone Number.';
      }
      if (!values.User.Profile.Dob) {
        errors.User.Profile.Dob = 'Please Enter Date Of Birth.';
      }
    }
  }

  return errors;
};

class AddSchoolStaffForm extends React.Component {
  props: AddSchoolStaffFormProps;
  state = {
    Preffered:
      (this.props.initialValues && this.props.initialValues.Preffered) || false,
    Administrator:
      (this.props.initialValues && this.props.initialValues.Administrator) ||
      false,
  };

  onSubmit = formData => {
    if (!formData.User) {
      formData.User = { Profile: {} };
    }

    const ExternalContactTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstContactTypes',
      'External'
    ).Id;

    const ExternalContactRoleId = getReferenceItemIdByDescription(
      this.props.references,
      'LstExternalContactTypes',
      'Accounting'
    ).Id;

    const SchoolUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'School'
    ).Id;

    // Add field defaults:
    formData.Administrator = formData.Administrator || false;
    formData.Preffered = formData.Preffered || false;

    // Add simulated data:
    formData.SchoolId = this.props.id;
    formData.ContactTypeId = ExternalContactTypeId; // "LstContactTypes": ['External']
    formData.ContactRoleId = ExternalContactRoleId; // "LstExternalContactTypes": ['Accounting']
    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.token.payload.UserId;
    formData.User.Claims = [{ ClaimValue: formData.Role }];
    formData.User.Profile.UserTypeId = SchoolUserTypeId; //"LstUserTypes": ['School']
    formData.User.Profile.CountryId = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States
    formData.User.UserName = formData.User.Email;
    formData.User.Password = 'tempPass!!11';
    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        formData.User.Profile.PictureHeader = base64Fields.headerString;
        formData.User.Profile.Picture = base64Fields.imageString;
        delete formData.PictureFile;
        log('onSubmit formData', formData);
        this.props.dispatchFormPost(formData);
      });
    } else {
      log('onSubmit formData', formData);
      this.props.dispatchFormPost(formData);
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SchoolStaffRoleSelectField
            name="Role"
            label="Select Role*"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="First Name*"
            name="User.Profile.FirstName"
            required={true}
          />
          <TextField
            label="Last Name*"
            name="User.Profile.LastName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Preferred Name (Nickname)"
            name="User.Profile.PrefferedName"
          />
          <TextField label="Title" name="User.Profile.Title" />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="User.Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
          <EmailField label="Email*" name="User.Email" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Phone*" name="User.PhoneNumber" required={true} />
          <DateField
            dob
            label="Date of Birth*"
            name="User.Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <SwitchField
            label="Preferred Contact"
            name="Preffered"
            id="School.Staff.AddSchoolStaff.Preffered"
            help={true}
            checked={this.state.Preffered}
            onClick={() => {
              let Preffered = this.state.Preffered;
              this.setState({ Preffered: !this.state.Preffered });
            }}
          />
          <SwitchField
            label="Can Login (Admin)"
            name="Administrator"
            checked={this.state.Administrator}
            onClick={() => {
              this.setState({ Administrator: !this.state.Administrator });
            }}
          />
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

const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
  };
};

const connectedAddSchoolStaffForm = connect(
  AddSchoolStaffForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-staff', // a unique identifier for this form
  validate,
})(connectedAddSchoolStaffForm);
