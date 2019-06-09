import React from 'react';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Position } from '@blueprintjs/core';
import { reduxForm, formValueSelector } from 'redux-form';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import MarketingSelectField from 'components/Forms/ConnectedFields/MarketingSelectField';
import DateField from 'components/Forms/DateField';
import ReadOnlyMessage from 'components/DataLoading/ReadOnlyMessage';
import { log } from 'log';

type AddMarketingFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  schoolId: string,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.Detail) {
    errors.Detail = 'Please enter a Detail.';
  }
  if (!values.MarketingTypeId) {
    errors.MarketingTypeId = 'Please select a Type.';
  }
  if (!values.StartDate) {
    errors.StartDate = 'Start Date Required';
  } else if (!moment(values.StartDate).isSameOrAfter(moment(), 'day')) {
    errors.StartDate = 'Start Date must be in future';
  }
  if (values.EndDate) {
    if (!moment(values.EndDate).isAfter(values.StartDate)) {
      errors.EndDate = 'End Date can not be less then start date';
    }
  }
  return errors;
};

class AddMarketingForm extends React.Component {
  props: AddMarketingFormProps;
  onSubmit = formData => {
    formData.StartDate =
      formData.StartDate &&
      moment
        .utc(formData.StartDate)
        .startOf('day')
        .format();

    if (formData.EndDate) {
      formData.EndDate = moment
        .utc(formData.EndDate)
        .startOf('day')
        .format();
    } else {
      formData.EndDate = '9999-12-31T00:00:00';
    }

    formData['SchoolId'] = this.props.schoolId;

    log('AddMarketingForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };

  render() {
    let currentDate = moment().format();

    let campaignStarted =
      this.props.initialValues &&
      moment(this.props.initialValues.StartDate).isBefore(currentDate, 'day')
        ? true
        : false;

    let campaignEnded =
      this.props.initialValues &&
      moment(this.props.initialValues.EndDate).isBefore(currentDate, 'day')
        ? true
        : false;

    return (
      <div>
        {campaignEnded ? (
          <ReadOnlyMessage errorMessage="This Form is Read Only because the Campaign has ended." />
        ) : (
          ''
        )}
        <fieldset disabled={campaignEnded}>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
            <InputBlock>
              <TextField label="Detail*" name="Detail" />
            </InputBlock>
            <InputBlock>
              <TextField
                label="Target"
                name="Target"
                type="number"
                input={{ min: 0 }}
              />
            </InputBlock>
            <InputBlock>
              <SelectField
                label="Type*"
                name="MarketingTypeId"
                placeholder="Select Type"
                referenceOptions="LstMarketingTypes"
                disabled={campaignEnded}
              />
            </InputBlock>
            <InputBlock>
              <DateField
                future
                label="Start Date*"
                name="StartDate"
                required={true}
                disabled={campaignStarted}
              />
              <DateField future label="End Date" name="EndDate" />
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
    token: state.token,
  };
};

const connectedAddMarketingForm = connect(
  AddMarketingForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-rank-progression', // a unique identifier for this form
  validate,
})(connectedAddMarketingForm);
