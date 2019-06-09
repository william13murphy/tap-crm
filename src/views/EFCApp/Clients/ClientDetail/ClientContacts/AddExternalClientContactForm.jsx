import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';

// Reference Data
import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { imageToBase64String, base64StringToFields } from 'util/base64';

// Fields
import TextField from 'components/Forms/TextField';
import ImageField from 'components/Forms/ImageField';
import EmailField from 'components/Forms/EmailField';
import SwitchField from 'components/Forms/SwitchField';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';
import SubmitButton from 'components/Forms/SubmitButton';
import InputBlock from 'components/Forms/InputBlock';
import { log } from 'log';

type AddExternalClientContactFormProps = {
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  dispatchFormPost: any,
  clientId: string,
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
      if (!values.User.Profile.UserTypeId) {
        errors.User.Profile.UserTypeId = 'Please enter a User Type.';
      }
      if (!values.User.Profile.Dob) {
        errors.User.Profile.Dob = 'Please enter a Date of Birth.';
      } else if (
        moment(moment().startOf('day')).diff(values.User.Profile.Dob, 'years') <
        18
      ) {
        errors.User.Profile.Dob = 'Client age must be greater than 18.';
      }
      if (!values.User.Profile.GenderId) {
        errors.User.Profile.GenderId = 'Please enter a Gender.';
      }
      if (!values.User.Profile.CountryId) {
        errors.User.Profile.CountryId = 'Please enter a Country.';
      }
    }
  }

  return errors;
};

class AddExternalClientContactForm extends React.Component {
  props: AddExternalClientContactFormProps;
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

    formData.ClientId =
      (this.props.initialValues && this.props.initialValues.ClientId) ||
      this.props.clientId;

    // Add simulated data:
    formData.Administrator = formData.Administrator || false;
    formData.Preffered = formData.Preffered || false;
    formData.ContactTypeId = ExternalContactTypeId;
    formData.ContactRoleId = ExternalContactRoleId; // "LstExternalContactTypes":['other']

    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.token.payload.UserId;
    formData.User.Claims = [{ ClaimValue: 'SCHUSER' }];
    formData.User.UserName = formData.User.Email;
    formData.User.Password = 'AbcDEF123!!';

    formData.User.Profile.UserTypeId = SchoolUserTypeId; //"LstUserTypes": ['school']
    formData.User.Profile.CountryId = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States

    if (formData.User.Profile.ProfilePic) {
      imageToBase64String(formData.User.Profile.ProfilePic).then(
        base64ImageString => {
          const base64Fields = base64StringToFields(base64ImageString);

          formData.User.Profile.PictureHeader = base64Fields.headerString;
          formData.User.Profile.Picture = base64Fields.imageString;
          delete formData.User.Profile.ProfilePic;

          log('onSubmit formData', formData);
          this.props.dispatchFormPost(formData);
        }
      );
    } else {
      log('onSubmit formData', formData);
      this.props.dispatchFormPost(formData);
    }
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField
            label="First Name*"
            name="User.Profile.FirstName"
            required={true}
            placeholder={false}
          />
          <TextField
            label="Last Name*"
            name="User.Profile.LastName"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField label="Title" name="User.Profile.Title" />
          <SelectField
            label="Gender*"
            name="User.Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
        </InputBlock>

        <InputBlock>
          <EmailField label="Email*" name="User.Email" required={true} />
          <TextField label="Phone Number" name="User.PhoneNumber" />
        </InputBlock>

        <InputBlock>
          <DateField
            dob
            label="Date of Birth*"
            required={true}
            name="User.Profile.Dob"
          />
          <ImageField label="Profile Picture" name="User.Profile.ProfilePic" />
        </InputBlock>

        <InputBlock>
          <SwitchField
            label="Preferred Contact"
            name="Preffered"
            checked={this.state.Preffered}
            onClick={() => {
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

        <div className="FormButtonsContainer">
          <SubmitButton disabled={pristine || submitting}>Save</SubmitButton>
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

const connectedAddExternalClientContactForm = connect(
  AddExternalClientContactForm,
  mapStateToProps
);

export default reduxForm({
  form: 'client-external-contact-create', // a unique identifier for this form
  validate,
})(connectedAddExternalClientContactForm);
