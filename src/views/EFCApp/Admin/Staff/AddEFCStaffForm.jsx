import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import InputBlock from 'components/Forms/InputBlock';

import EmailField from 'components/Forms/EmailField';
import DateField from 'components/Forms/DateField';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import EFCStaffRoleSelectField from 'components/Forms/ConnectedFields/EFCStaffRoleSelectField';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { log } from 'log';

type AddEFCStaffFormProps = {
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

  let Profile = values.Profile ? values.Profile : {};

  if (!values.Role) {
    errors.Role = 'Please select a Role.';
  }

  if (!Profile.FirstName) {
    errors.Profile.FirstName = 'Please enter a First Name.';
  }

  if (!Profile.LastName) {
    errors.Profile.LastName = 'Please enter a Last Name.';
  }
  if (!values.Email) {
    errors.Email = 'Please enter an Email Address.';
  }
  if (!values.Gender) {
    errors.Gender = 'Please select the Gender';
  }
  if (!values.Dob) {
    errors.Dob = 'Please select the Gender';
  }
  if (!values.CountryId) {
    errors.Dob = 'Please select the Country';
  }

  return errors;
};

class AddEFCStaffForm extends React.Component {
  props: AddEFCStaffFormProps;
  onSubmit = formData => {
    const EfcUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'EFC'
    ).Id;

    formData.UserName = formData.Email;
    formData.Password = 'testdb99!!';
    formData.Profile.UserTypeId = EfcUserTypeId;
    formData.Claims = [
      {
        ClaimValue: formData.Role,
      },
    ];

    delete formData.confirmEmail;
    delete formData.Role;

    log('AddEFCStaffForm formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <EFCStaffRoleSelectField name="Role" label="Select Role" />
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
          <TextField label="Title" name="Profile.Title" />
          <SelectField
            label="Gender*"
            name="Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
        </InputBlock>
        <InputBlock>
          <TextField label="Phone*" name="PhoneNumber" required={true} />
          <EmailField label="Email*" name="Email" required={true} />
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
        <div className="FormButtonsContainer">
          <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    references: state.utility.references,
  };
}
const connectedAddEFCStaffForm = connect(
  AddEFCStaffForm,
  mapStateToProps
);
export default reduxForm({
  form: 'add-staff', // a unique identifier for this form
  validate,
})(connectedAddEFCStaffForm);
