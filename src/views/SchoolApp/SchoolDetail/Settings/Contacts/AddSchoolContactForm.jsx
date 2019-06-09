import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import { getReferenceItemIdByDescription } from 'api/referenceItems';

import InputBlock from 'components/Forms/InputBlock';
import EmailField from 'components/Forms/EmailField';
import DateField from 'components/Forms/DateField';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SchoolStaffRoleSelectField from 'components/Forms/ConnectedFields/SchoolStaffRoleSelectField';
import { log } from 'log';

type AddSchoolUserFormProps = {
  schoolId: string,
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

      if (!values.User.Profile.CountryId) {
        errors.User.Profile.CountryId = 'Please enter a Country.';
      }

      if (!values.User.Profile.Dob) {
        errors.User.Profile.Dob = 'Please enter a Date Of Birth.';
      }
    }
  }

  return errors;
};

class AddSchoolUserForm extends React.Component {
  props: AddSchoolUserFormProps;
  state = {
    Preffered:
      (this.props.initialValues && this.props.initialValues.Preffered) || false,
  };

  onSubmit = formData => {
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

    const UnknownGenderId = getReferenceItemIdByDescription(
      this.props.references,
      'LstGenders',
      'Undisclosed'
    ).Id;

    const SchoolUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'School'
    ).Id;

    // Add field defaults:
    formData.Administrator = true;
    formData.Preffered = true;

    if (!formData.User) {
      formData.User = { Profile: {} };
    }

    // Add simulated data:
    formData.SchoolId = this.props.schoolId;
    formData.ContactTypeId = ExternalContactTypeId; // "LstContactTypes": ['External Contact']
    formData.ContactRoleId = ExternalContactRoleId; // "LstExternalContactTypes":['owner']
    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.token.payload.UserId;
    formData.User.Claims = [{ ClaimValue: formData.User.Claims[0].ClaimValue }];
    formData.User.Profile.GenderId = UnknownGenderId; //"LstGenders": ['Undisclosed'];
    formData.User.Profile.UserTypeId = SchoolUserTypeId; //"LstUserTypes": ['School'];;
    formData.User.Profile.CountryId = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States
    formData.User.UserName = formData.User.Email;
    formData.User.Password = 'tempPass!!11';

    delete formData.confirmEmail;
    delete formData.Role;

    log('onSubmit formDAta', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SchoolStaffRoleSelectField
            name="User.Claims[0].ClaimValue"
            id="School.Settings.AddNewContact.Role"
            label="Select Role*"
            required={true}
            help={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            help={true}
            label="First Name*"
            name="User.Profile.FirstName"
            id="School.Settings.AddNewContact.FirstName"
            required={true}
          />
          <TextField
            label="Last Name*"
            help={true}
            name="User.Profile.LastName"
            id="School.Settings.AddNewContact.LastName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <EmailField
            label="Email*"
            name="User.Email"
            id="School.Settings.AddNewContact.Email"
            required={true}
            help={true}
          />
          <DateField
            dob
            label="Date of Birth*"
            name="User.Profile.Dob"
            required={true}
          />
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

const connectedAddSchoolUserForm = connect(
  AddSchoolUserForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-user', // a unique identifier for this form
  validate,
})(connectedAddSchoolUserForm);
