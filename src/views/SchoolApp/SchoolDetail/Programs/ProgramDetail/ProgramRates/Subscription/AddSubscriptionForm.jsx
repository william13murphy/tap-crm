import React from 'react';
import { reduxForm } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';
import DateField from 'components/Forms/DateField';
import TextField from 'components/Forms/TextField';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import moment from 'moment';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';
import { log } from 'log';

type AddSubscriptionFormProps = {
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
  User: {
    Profile: {},
  },
};

const validate = (values, initialValues) => {
  let iV = initialValues.initialValues;
  const errors = {};
  if (!values.Name) {
    errors.Name = 'Please enter a Subscription Name.';
  }

  if (!values.StatusId) {
    errors.StatusId = 'Please select a Status';
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
  if (!values.SignupFees) {
    errors.SignupFees = 'Please Enter Signup Fees.';
  }
  if (!values.CancellationFees) {
    errors.CancellationFees = 'Please Enter Cancellation Fees.';
  }
  if (!values.NumberOfClasses) {
    errors.NumberOfClasses = 'Please select default number of classes.';
  }
  if (values.AnnualCost >= 1000000) {
    errors.AnnualCost =
      'Annual Fees cannot be euqla to or greater than 1000000';
  }
  if (!values.TotalFees) {
    errors.TotalFees = 'Please enter Total fees.';
  }
  return errors;
};

class AddSubscriptionForm extends React.Component {
  props: AddSubscriptionFormProps;
  onSubmit = formData => {
    formData.Name = formData.Name;
    formData.SchoolId = this.props.id;
    formData.SchoolStyleId = this.props.schoolStyleId;
    formData.EnrollmentTypeId = '98aa6452-1ff2-4c4d-ad7b-c184cd96f8d2'; //Fixed Enrollment type to Punchcard
    formData.StartDate = formData.StartDate;
    formData.EndDate = formData.EndDate;
    formData.StatusId = formData.StatusId;
    formData.SignupCost = formData.SignupCost;
    formData.AnnualCost = formData.AnnualCost;
    formData.CancellationCost = formData.CancellationCost;
    formData.DefaultClasses =
      formData.DefaultClasses === 'Unlimited' ? 100 : formData.DefaultClasses;
    formData.TotalCost = formData.TotalCost;
    formData.Description = formData.Description;

    log('onSubmit formData', formData);
    this.props.dispatchFormPost(formData);
  };
  render() {
    const additionalClasses = Array(20)
      .fill()
      .map((e, i) => i + 1)
      .concat('Unlimited');
    let currentDate = moment().format();
    let isDisabled = this.props.initialValues
      ? this.props.initialValues.EndDate < currentDate
      : false;
    return (
      <div>
        {this.props.initialValues &&
        this.props.initialValues.EndDate < currentDate ? (
          <ReadOnlyMessage errorMessage="This Form is Read Only because the time period has passed." />
        ) : (
          ''
        )}
        <fieldset disabled={isDisabled}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
            <InputBlock>
              <TextField
                label="Subscription Name*"
                name="Name"
                required={true}
              />
              <SelectField
                label="Select Status*"
                name="StatusId"
                placeholder=" "
                required={true}
                referenceOptions="LstStyleRateStatuses"
                disabled={isDisabled}
              />
            </InputBlock>
            <InputBlock>
              <DateField label="Start Date*" name="StartDate" required={true} />
              <DateField
                label="End Date"
                name="EndDate"
                id="School.Programs.AddNewSubscription.EndDate"
                required={true}
                help={true}
              />
            </InputBlock>
            <InputBlock>
              <TextField
                label="Sign-up Fees"
                type="number"
                name="SignupCost"
                input={{ min: 0, step: '.01' }}
                required={true}
                currency
              />
              <TextField
                label="Cancellation Fees"
                type="number"
                name="CancellationCost"
                input={{ min: 0, step: '.01' }}
                required={true}
                currency
              />
            </InputBlock>
            <InputBlock>
              <TextField
                label="Annual Fees"
                type="number"
                name="AnnualCost"
                input={{ min: 0, step: '.01' }}
                required={true}
                currency
              />
            </InputBlock>
            <InputBlock>
              <SelectField
                label="Number of Included Weekly Classes"
                name="DefaultClasses"
                options={additionalClasses.map(item => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
                required={true}
                disabled={isDisabled}
              />
            </InputBlock>
            <InputBlock>
              <TextField
                label="Rate Description"
                name="Description"
                required={true}
                textarea={true}
              />
            </InputBlock>
            <div className="FormButtonsContainer">
              <SubmitButton intent="pt-intent-primary">Submit</SubmitButton>
            </div>
          </form>
        </fieldset>
      </div>
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
})(AddSubscriptionForm, mapStateToProps);
