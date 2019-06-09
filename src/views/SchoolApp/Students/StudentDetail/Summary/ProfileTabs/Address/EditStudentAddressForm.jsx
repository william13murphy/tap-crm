import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import countryIds from 'src/redux/data/countryIds';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';

type EditStudentAddressFormProps = {
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
  studentDetail: {
    payload: {
      StatusTypeId: string,
      CountryId: string,
    },
  },
};

const validate = (values, initialValues) => {
  const errors = {};

  let countryId = initialValues.initialValues.CountryId;
  if (!values.Address1) {
    errors.Address1 = 'Please enter Address1.';
  }
  if (!values.City) {
    errors.Title = 'Please enter a City.';
  }
  if (!values.State) {
    errors.Detail = 'Please enter a State.';
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

  return errors;
};

class EditStudentAddressForm extends React.Component {
  props: EditStudentAddressFormProps;
  constructor(props: EditStudentAddressFormProps) {
    super(props);
    this.state = {
      countryId: null,
      addressCode: 'Zip*',
    };
  }
  onSubmit = formData => {
    formData['StudentId'] = this.props.studentId;
    formData['StatusTypeId'] = this.props.studentDetail.payload.StatusTypeId;
    formData['CountryId'] = this.props.studentDetail.payload.CountryId;
    formData['CreatedBy'] = this.props.token.payload.UserId;

    log('EditStudentAddressForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };

  componentDidMount() {
    let countryId = this.props.initialValues
      ? this.props.initialValues.CountryId
      : this.props.studentDetail.payload.CountryId;

    // Checks whether the selected Country is Australia,
    // and if so changes the addressCode label as Post Code
    let addressCode =
      countryId === countryIds.Australia ? 'Post Code*' : 'Zip*';

    this.setState({
      addressCode,
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Address1*" name="Address1" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Address2" name="Address2" />
        </InputBlock>
        <InputBlock>
          <TextField label="City*" name="City" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="State*" name="State" required={true} />
        </InputBlock>
        <InputBlock>
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
    token: state.token,
    studentDetail: state.student.detail,
  };
};

const connectedAddStudentContactForm = connect(
  EditStudentAddressForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-contact', // a unique identifier for this form
  validate,
})(connectedAddStudentContactForm);
