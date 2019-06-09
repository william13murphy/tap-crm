import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import EmailField from 'components/Forms/EmailField';
import TextField from 'components/Forms/TextField';
import DateField from 'components/Forms/DateField';
import ImageField from 'components/Forms/ImageField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import SwitchField from 'components/Forms/SwitchField';
import ClientSelectField from 'components/Forms/ConnectedFields/ClientSelectField';
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import { log } from 'log';

type AddClientAdminFormProps = {
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
  if (!values.ClientId) {
    errors.ClientId = 'Please select a Client.';
  }
  if (!values.User.Profile.FirstName) {
    errors.User.Profile.FirstName = 'Please enter a First name.';
  }
  if (!values.User.Profile.LastName) {
    errors.User.Profile.LastName = 'Please enter a Last Name.';
  }
  if (!values.User.Profile.GenderId) {
    errors.User.Profile.GenderId = 'Please enter a Gender.';
  }
  if (!values.User.Profile.Dob) {
    errors.User.Profile.Dob = 'Please enter a Date of Birth.';
  } else if (
    moment(moment().startOf('day')).diff(values.User.Profile.Dob, 'years') < 18
  ) {
    errors.User.Profile.Dob = 'Client age must be 18 or older.';
  }
  if (!values.User.Email) {
    errors.User.Email = 'Please enter an Email Address.';
  }
  return errors;
};

class AddClientAdminForm extends React.Component {
  props: AddClientAdminFormProps;
  state = {
    Preffered:
      (this.props.initialValues && this.props.initialValues.Preffered) || false,
    Administrator:
      (this.props.initialValues && this.props.initialValues.Administrator) ||
      false,
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
      'Other'
    ).Id;

    const SchoolUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'School'
    ).Id;

    // Add simulated data:
    formData.Administrator = true;
    formData.Preffered = true;
    formData.ContactTypeId = ExternalContactTypeId;
    formData.ContactRoleId = ExternalContactRoleId;
    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.token.payload.UserId;
    formData.User.Claims = [{ ClaimValue: 'CLADMIN' }]; // Client Admin Role
    formData.User.Profile.UserTypeId = SchoolUserTypeId;
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
      delete formData.confirmEmail;
      delete formData.Role;
      log('onSubmit formData >>', formData);
      this.props.dispatchFormPost(formData);
    }
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <ClientSelectField name="ClientId" label="Client*" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="First Name*"
            name="User.Profile.FirstName"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Last Name*"
            name="User.Profile.LastName"
            required={true}
          />
        </InputBlock>
        <TextField label="Title" name="User.Profile.Title" />
        <InputBlock>
          <SelectField
            label="Gender*"
            name="User.Profile.GenderId"
            referenceOptions="LstGenders"
            required={true}
          />
          <DateField
            dob
            label="Date of Birth*"
            name="User.Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <EmailField label="Email*" name="User.Email" required={true} />
          <TextField label="Phone Number" name="User.PhoneNumber" />
        </InputBlock>
        <InputBlock>
          <SwitchField
            label="Preferred Contact"
            name="Preffered"
            checked={this.state.Preffered}
            onClick={() => {
              let Preffered = this.state.Preffered;
              this.setState({ Preffered: !Preffered });
            }}
          />
          <SwitchField
            label="Can Login (Admin)"
            name="Administrator"
            checked={this.state.Administrator}
            onClick={() => {
              let Administrator = this.state.Administrator;
              this.setState({ Administrator: !Administrator });
            }}
          />
        </InputBlock>
        <InputBlock>
          <ImageField label="Picture" name="PictureFile" />
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

const connectedAddClientAdminForm = connect(
  AddClientAdminForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-client-admin', // a unique identifier for this form
  validate,
})(connectedAddClientAdminForm);
