import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';
import DateField from 'components/Forms/DateField';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import moment from 'moment';
import { log } from 'log';

type AddPunchCardFormProps = {
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
  schoolStyleId: string,
};

const validate = (values, initialValues) => {
  let iV = initialValues.initialValues;
  const errors = {
    User: {
      Profile: {},
    },
  };

  if (!values.Name) {
    errors.Name = 'Please enter a Punch Card Name.';
  }
  if (!values.StatusId) {
    errors.StatusId = 'Please select a status.';
  }

  if (iV) {
    if (!values.StartDate) {
      errors.StartDate = 'Please select a Start Date.';
    }
  } else {
    if (!values.StartDate) {
      errors.StartDate = 'Please select a Start Date.';
    } else if (
      !moment(values.StartDate).isSameOrAfter(moment().startOf('day'))
    ) {
      errors.StartDate = 'Start Date must be in future';
    }
  }

  if (values.EndDate) {
    if (!moment(values.EndDate).isSameOrAfter(moment(values.StartDate))) {
      errors.EndDate = 'End Date can not be less than Start Date';
    }
  }
  if (!values.TypeId) {
    errors.TypeId = 'Please select a Program Type.';
  }
  if (!values.MaxClasses) {
    errors.MaxClasses = 'Please Enter Maximum Allowed Class.';
  }
  if (!values.CancellationFees) {
    errors.CancellationFees = 'Please Enter Cancellation Fees.';
  }
  if (!values.NumberOfClasses) {
    errors.NumberOfClasses = 'Please select default number of classes.';
  }

  if (!values.AnnualCost) {
    errors.AnnualCost = 'Please enter anual fees.';
  } else if (values.AnnualCost >= 1000000) {
    errors.AnnualCost =
      'Annual Fees cannot be euqla to or greater than 1000000';
  }
  if (!values.TotalFees) {
    errors.TotalFees = 'Please enter Total fees.';
  }

  return errors;
};

class AddPunchCardForm extends React.Component {
  props: AddPunchCardFormProps;
  onSubmit = formData => {
    formData.Name = formData.Name;
    formData.SchoolId = this.props.id;
    formData.SchoolStyleId = this.props.schoolStyleId;
    formData.EnrollmentTypeId = 'f5fcc6fb-3e23-4e08-b227-e85978b93553'; //Fixed Enrollment type to Punchcard
    formData.StartDate = formData.StartDate;
    formData.EndDate = formData.EndDate;
    formData.StatusId = formData.StatusId;
    formData.DefaultClasses = formData.DefaultClasses;
    formData.AnnualCost = formData.AnnualCost;
    formData.Description = formData.Description;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="Punch Card Name*" name="Name" required={true} />
          <SelectField
            label="Select Status*"
            name="StatusId"
            placeholder=" "
            required={true}
            referenceOptions="LstStyleRateStatuses"
          />
        </InputBlock>
        <InputBlock>
          <DateField label="Start Date*" name="StartDate" required={true} />
          <DateField
            label="End Date"
            name="EndDate"
            id="School.Programs.AddNewPunchCard.EndDate"
            required={true}
            help={true}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Max. Classes Allowed"
            type="number"
            name="DefaultClasses"
            required={true}
          />
          <TextField
            label="Cost*"
            type="number"
            name="AnnualCost"
            input={{ min: 0, step: '.01' }}
            required={true}
            currency
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Description"
            name="Description"
            required={true}
            textarea={true}
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
    schoolStyles: state.school.styles,
  };
};

export default reduxForm({
  form: 'add-school-style', // a unique identifier for this form
  validate,
})(AddPunchCardForm, mapStateToProps);
