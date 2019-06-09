import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import DateField from 'components/Forms/DateField';
import SwitchField from 'components/Forms/SwitchField';
import SelectField from 'components/Forms/SelectField';
import EmailField from 'components/Forms/EmailField';

import { getReferenceItemOptions } from 'api/referenceItems';
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
  studentDetail: {
    payload: {
      CountryId: string,
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

const validate = values => {
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

  if (!values.RelationshipTypeId) {
    errors.RelationshipTypeId = 'Please select the Relationship type.';
  }

  return errors;
};

class AddStudentContactForm extends React.Component {
  constructor(props: AddStudentContactFormProps) {
    super(props);
    this.state = {
      IsPrimary: this.props.initialValues
        ? this.props.initialValues.IsPrimary
        : false,
      IsBilling: this.props.initialValues
        ? this.props.initialValues.IsBilling
        : false,
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

  render() {
    const RelationshipTypeOptions = getReferenceItemOptions(
      'LstRelationshipTypes',
      this.props.references
    ).filter(cV => {
      return cV.label !== 'Self';
    });

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="FirstName*" name="FirstName" />
          <TextField label="LastName*" name="LastName" />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Relationship to Student*"
            name="RelationshipTypeId"
            placeholder="Select a Relationship"
            options={RelationshipTypeOptions}
          />
          <EmailField label="Email*" name="Email" />
        </InputBlock>

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
