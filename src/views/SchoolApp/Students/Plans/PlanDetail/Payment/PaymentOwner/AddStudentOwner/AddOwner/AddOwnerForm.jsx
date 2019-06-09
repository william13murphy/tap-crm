import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import countryIds from 'src/redux/data/countryIds';

import SelectMockInput from 'components/Forms/SelectMockInput';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';
import CountryStateSelectField from 'components/Forms/ConnectedFields/CountryStateSelectField';

type AddOwnerFormProps = {
  studentId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  planId: any,
  schoolId?: string,
  countryId: string,
  addStudentOwnerData: any,
  schoolProfile: {
    payload: {
      CountryId: string,
    },
  },
  students: Array<{}>,
};

const validate = values => {
  let countryId = values.CountryId;
  const errors = {};

  if (!values.FirstName) {
    errors.FirstName = 'Please enter the first name.';
  }

  if (!values.LastName) {
    errors.LastName = 'Please enter the last name.';
  }

  if (!values.MobileNumber) {
    errors.MobileNumber = 'Please enter the Mobile Number.';
  }

  if (!values.Email) {
    errors.Email = 'Please enter an Email.';
  }

  if (!values.Address1) {
    errors.Address1 = 'Please enter a Address1.';
  }

  if (!values.City) {
    errors.City = 'Please enter a City.';
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
    errors.State = 'Please enter a State';
  }

  return errors;
};

class AddOwnerForm extends React.Component {
  constructor(props: AddOwnerFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
      studentOwner: null,
    };
  }
  onSubmit = formData => {
    formData['SchoolId'] = this.props.match.params.schoolId;
    formData['PlanId'] = this.props.match.params.planId;
    formData['Finalized'] = false;

    this.props.dispatchFormPost(formData);
  };

  componentDidMount() {
    let countryId;

    if (this.props.initialValues && this.props.initialValues.CountryId) {
      countryId = this.props.initialValues.CountryId;
    } else if (
      this.props.addStudentOwnerData &&
      this.props.addStudentOwnerData.CountryId
    ) {
      countryId = this.props.addStudentOwnerData.CountryId;
    } else {
      countryId = this.props.schoolProfile.payload.CountryId;
    }

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
            label="Prefix"
            name="Prefix"
            textarea={false}
            required={false}
          />
          <TextField
            label="Title"
            name="Title"
            textarea={false}
            required={false}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="First Name*"
            name="FirstName"
            textarea={false}
            required={true}
          />
          <TextField
            label="Last Name*"
            name="LastName"
            textarea={false}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Suffix"
            name="Suffix"
            textarea={false}
            required={false}
          />
          <TextField
            label="Preferred Name"
            name="PrefferedName"
            textarea={false}
            required={false}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Mobile Number*"
            name="MobileNumber"
            type="number"
            textarea={false}
            required={true}
          />
          <TextField
            label="Phone Number"
            name="PhoneNumber"
            type="number"
            textarea={false}
            required={false}
          />
          <TextField
            label="Email*"
            name="Email"
            textarea={false}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <DateField dob label="Date of Birth" name="Dob" required={false} />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Address 1*"
            name="Address1"
            textarea={false}
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Address 2"
            name="Address2"
            textarea={false}
            required={false}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="City*"
            name="City"
            textarea={false}
            required={true}
          />
          <InputBlock>
            <CountryStateSelectField
              label="State*"
              name="State"
              countryId={this.state.countryId}
              required={true}
            />
          </InputBlock>
          <TextField
            label={`${this.state.addressCode}`}
            name="Zip"
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
    studentCalendar: state.student.studentCalendar,
    schoolProfile: state.school.profile,
  };
};

const connectedAddOwnerForm = connect(
  AddOwnerForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-account-owner', // a unique identifier for this form
  validate,
})(connectedAddOwnerForm);
