import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import DateField from 'components/Forms/DateField';
import EmailField from 'components/Forms/EmailField';
import ImageField from 'components/Forms/ImageField';
import InputBlock from 'components/Forms/InputBlock';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import TextField from 'components/Forms/TextField';
import moment from 'moment';
import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import { getReferenceItemIdByDescription } from 'api/referenceItems';
import { imageToBase64String, base64StringToFields } from 'util/base64';
import countryIds from 'src/redux/data/countryIds';
import { log } from 'log';

type AddSchoolStudentFormProps = {
  schoolId: string,
  userId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = (values, initialValues) => {
  let countryId = initialValues.schoolProfile.payload.CountryId;
  const errors = {
    User: {
      Profile: {},
    },
  };
  if (values && values.User) {
    if (values.User.Profile) {
      if (!values.User.Profile.FirstName) {
        errors.User.Profile.FirstName = 'Please enter a First Name.';
      }
      if (!values.User.Profile.LastName) {
        errors.User.Profile.LastName = 'Please enter a Last Name.';
      }
    }
  }
  if (!values.Address1) {
    errors.Address1 = 'Please enter a Street Address.';
  }
  if (!values.City) {
    errors.City = 'Please enter a City.';
  }
  if (!values.State) {
    errors.State = 'Please enter a State.';
  }

  // If the Country is Australia, then we need to validate for a minimum of 4 characters,
  // rather than checking for 5 characters.

  if (countryId === countryIds.Australia) {
    if (!values.Zip) {
      errors.Zip = 'Please enter the Post Code';
    } else if (values.Zip.length < 4) {
      errors.Zip = 'Invaid Post Code Format: Atleast 4 characters required.';
    }
  } else {
    if (!values.Zip) {
      errors.Zip = 'Please enter the Zip Code';
    } else if (values.Zip.length < 5) {
      errors.Zip = 'Invaid Zip Code Format: Atleast 5 characters required.';
    } else if (values.Zip.length > 10) {
      errors.Zip = 'Exceeded a Maximum limit of 10 characters.';
    }
  }

  if (!values.User) {
    values.User = { Profile: {} };
  }

  if (values && values.User) {
    if (!values.User.Email) {
      errors.User.Email = 'Please enter an Email Address.';
    }

    if (values.User.Profile) {
      if (!values.User.Profile.Dob) {
        errors.User.Profile.Dob = 'Please enter a Birth Date.';
      }
      if (!values.User.Profile.GenderId) {
        errors.User.Profile.GenderId = 'Please enter a Gender.';
      }
    }
  }

  return errors;
};

class AddSchoolStudentForm extends React.Component {
  constructor(props: AddSchoolStudentFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
    };
  }
  onSubmit = formData => {
    if (!formData.User) {
      formData.User = { Profile: {} };
    }

    const SchoolUserTypeId = getReferenceItemIdByDescription(
      this.props.references,
      'LstUserTypes',
      'School'
    ).Id;

    formData.SchoolId = this.props.schoolId;
    formData.UserId = formData.User.Id || this.props.token.payload.UserId;
    formData.User.CreatedOn = moment().format('YYYY-MM-DD');
    formData.CreatedOn = moment().format('YYYY-MM-DD');
    formData.User.CreatedBy = this.props.userId;
    formData.CreatedBy = this.props.userId;
    formData.User.Claims = [{ ClaimValue: 'STUDENT' }]; // Student Role
    formData.User.Profile.UserTypeId = SchoolUserTypeId;
    formData.CountryId = this.props.schoolProfile.payload.CountryId; // United States
    formData.User.Profile.CountryId = this.props.schoolProfile.payload.CountryId; // United States
    formData.User.Profile.FirstName = formData.User.Profile.FirstName;
    formData.User.Profile.LastName = formData.User.Profile.LastName;
    formData.User.UserName = formData.User.Email;
    formData.User.Password = 'tempPass!!11';
    formData.StatusTypeId = 'f74a4642-46f3-49ac-9802-f5b082e79407'; // Active

    if (formData.PictureFile) {
      imageToBase64String(formData.PictureFile).then(base64ImageString => {
        const base64Fields = base64StringToFields(base64ImageString);

        formData.User.Profile.PictureHeader = base64Fields.headerString;
        formData.User.Profile.Picture = base64Fields.imageString;
        delete formData.PictureFile;

        if (this.props.leadData) {
          let params = {
            leadData: this.props.leadData,
            studentData: formData,
          };
          this.props.dispatchFormPost(params);
        } else {
          this.props.dispatchFormPost(formData);
        }
      });
    } else {
      log('onSubmit formData >>>', formData);
      if (this.props.leadData) {
        let params = {
          leadData: this.props.leadData,
          studentData: formData,
        };
        this.props.dispatchFormPost(params);
      } else {
        this.props.dispatchFormPost(formData);
      }
    }
  };

  componentDidMount() {
    let countryId = this.props.initialValues
      ? this.props.initialValues.CountryId
      : this.props.schoolProfile.payload.CountryId;

    // Checks whether the selected Country is Australia,
    // and if so changes the addressCode label as Post Code
    let addressCode =
      countryId === countryIds.Australia ? 'Post Code*' : 'Zip*';

    this.setState({
      countryId,
      addressCode,
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
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
          <TextField label="Address Line 1*" name="Address1" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Address Line 2" name="Address2" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="City*" name="City" required={true} />
          <CountryStateSelectField
            label="State*"
            name="State"
            countryId={this.state.countryId}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label={`${this.state.addressCode}`}
            name="Zip"
            required={true}
          />
          <TextField
            label="Phone Number"
            name="User.PhoneNumber"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <EmailField label="Email*" name="User.Email" required={true} />
          <DateField
            dob
            label="Date of Birth*"
            name="User.Profile.Dob"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="User.Profile.GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
        </InputBlock>
        <InputBlock>
          <ImageField label="Picture" name="PictureFile" required={true} />
        </InputBlock>
        <InputBlock />
        <div className="FormButtonsContainer">
          <SubmitButton style={{width: '160px', marginBottom: '40px'}} intent="pt-intent-primary">Save</SubmitButton>
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

const connectedAddSchoolStudentForm = connect(
  AddSchoolStudentForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-school-user', // a unique identifier for this form
  validate,
})(connectedAddSchoolStudentForm);
