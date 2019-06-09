import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';

import countryIds from 'src/redux/data/countryIds';
import InputBlock from 'components/Forms/InputBlock';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';

import DateField from 'components/Forms/DateField';
import SwitchField from 'components/Forms/SwitchField';
import SelectField from 'components/Forms/SelectField';
import EmailField from 'components/Forms/EmailField';
import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';
import { log } from 'log';

type AddStudentContactFormProps = {
  studentId: string,
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
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  initialValues: { IsPrimary: boolean, IsBilling: boolean, StudentId: string },
  references: {},
};

const validate = (values, initialValues) => {
  let countryId = initialValues.schoolProfile.payload.CountryId;
  const errors = {};
  if (!values.FirstName) {
    errors.FirstName = 'Please enter the First Name.';
  }
  if (!values.LastName) {
    errors.LastName = 'Please enter the Last Name.';
  }
  if (!values.Email) {
    errors.Email = 'Please enter the Email.';
  }
  if (!values.PhoneNumber) {
    errors.PhoneNumber = 'Please enter the Phone Number.';
  }
  if (!values.Dob) {
    errors.Dob = 'Please enter the Date of Birth.';
  } else if (moment(moment().startOf('day')).diff(values.Dob, 'years') < 18) {
    errors.Dob = 'Contact age must be greater than 18.';
  } else if (moment(moment().startOf('day')).diff(values.Dob, 'years') > 100) {
    errors.Dob = 'Contact age cannot be greater than 100.';
  }
  if (!values.Address1) {
    errors.Address1 = 'Please enter the Address.';
  }
  if (!values.City) {
    errors.City = 'Please enter the City.';
  }
  if (!values.GenderId) {
    errors.GenderId = 'Please select the Gender';
  }
  if (!values.RelationshipTypeId) {
    errors.RelationshipTypeId = 'Please select the Relationship type.';
  }
  if (!values.Title) {
    errors.Title = 'Please enter a Title.';
  }
  if (!values.Detail) {
    errors.Detail = 'Please enter a Description.';
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

  if (!values.State) {
    errors.State = 'Please enter a State.';
  }

  return errors;
};

class AddStudentContactForm extends React.Component {
  constructor(props: AddStudentContactFormProps) {
    super(props);
    this.state = {
      countryId: null,
      IsPrimary: this.props.initialValues
        ? this.props.initialValues.IsPrimary
        : false,
      IsBilling: this.props.initialValues
        ? this.props.initialValues.IsBilling
        : false,
      addressCode: 'Zip*',
    };
  }

  onSubmit = formData => {
    formData['CountryId'] = this.props.studentDetail.payload.CountryId;
    formData['CreatedBy'] = this.props.token.payload.UserId;
    formData['StudentId'] =
      (this.props.initialValues && this.props.initialValues.StudentId) ||
      this.props.studentId;
    formData['State'] = formData.State;
    if (!formData.IsBilling) {
      formData.IsBilling = false;
    }

    if (!formData.IsPrimary) {
      formData.IsPrimary = false;
    }
    log('formData', formData);
    this.props.dispatchFormPost(formData);
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
          <TextField label="FirstName*" name="FirstName" required={true} />
          <TextField label="LastName*" name="LastName" required={true} />
        </InputBlock>

        <InputBlock>
          <EmailField label="Email*" name="Email" required={true} />
          <TextField label="Phone Number*" name="PhoneNumber" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Gender*"
            name="GenderId"
            required={true}
            referenceOptions="LstGenders"
          />
          <DateField dob label="Date of Birth*" name="Dob" required={true} />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Relationship to Student*"
            name="RelationshipTypeId"
            placeholder="Select a Relationship"
            referenceOptions="LstRelationshipTypes"
          />
          <TextField label="Address Line 1*" name="Address1" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Address Line 2" name="Address2" required={true} />
          <TextField label="City*" name="City" required={true} />
        </InputBlock>
        <InputBlock>
          <CountryStateSelectField
            label="State*"
            name="State"
            countryId={this.state.countryId}
            required={true}
          />
          <TextField
            label={`${this.state.addressCode}`}
            name="Zip"
            required={true}
          />
        </InputBlock>
        <InputBlock />
        <InputBlock>
          <SwitchField
            label="Primary Contact"
            name="IsPrimary"
            checked={this.state.IsPrimary}
            onClick={() => {
              let IsPrimary = this.state.IsPrimary;
              this.setState({ IsPrimary: !IsPrimary });
            }}
          />
        </InputBlock>
        <InputBlock>
          <SwitchField
            label="Billing Contact"
            name="IsBilling"
            checked={this.state.IsBilling}
            onClick={() => {
              let IsBilling = this.state.IsBilling;
              this.setState({ IsBilling: !IsBilling });
            }}
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
    studentDetail: state.student.detail,
    references: state.utility.references,
  };
};

const connectedAddStudentContactForm = connect(
  AddStudentContactForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-contact', // a unique identifier for this form
  validate,
})(connectedAddStudentContactForm);
