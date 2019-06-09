import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import connect from 'src/redux/connect';
import moment from 'moment';
import { Position } from '@blueprintjs/core';

import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import EmailField from 'components/Forms/EmailField';
import ProgramSelectField from 'components/Forms/ConnectedFields/ProgramSelectField';
import MarketingSelectField from 'components/Forms/ConnectedFields/MarketingSelectField';
import DateField from 'components/Forms/DateField';
import { log } from 'log';

type AddMarketingLeadFormProps = {
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.FirstName) {
    errors.FirstName = 'Please enter a First Name.';
  }
  if (!values.LastName) {
    errors.LastName = 'Please enter a Last Name.';
  }
  if (!values.SchoolMarketingId) {
    errors.SchoolMarketingId = 'Please select a Campaign.';
  }
  if (!values.LeadStatusId) {
    errors.LeadStatusId = 'Please select a Status.';
  }
  return errors;
};

class AddMarketingLeadForm extends React.Component {
  props: AddMarketingLeadFormProps;
  onSubmit = formData => {
    formData.TrialClass1Utc =
      formData.TrialClass1Utc &&
      moment
        .utc(formData.TrialClass1Utc)
        .startOf('day')
        .format();

    formData.TrialClass2Utc =
      formData.TrialClass2Utc &&
      moment
        .utc(formData.TrialClass2Utc)
        .startOf('day')
        .format();

    let leadFormData = [];

    leadFormData.push(formData);

    log('AddMarketingLeadForm onSubmit(): ', leadFormData);

    this.props.dispatchFormPost(leadFormData);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <TextField label="First Name*" name="FirstName" />
          <TextField label="Last Name*" name="LastName" />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Phone"
            name="Phone"
            type="number"
            input={{ min: 0 }}
          />
        </InputBlock>
        <InputBlock>
          <EmailField label="Email" type="text" name="Email" required={true} />
        </InputBlock>
        <InputBlock>
          <TextField label="Note" name="Note" required={true} textarea={true} />
        </InputBlock>
        <InputBlock>
          <ProgramSelectField
            label="Select a Program"
            name="InterestedIn"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <MarketingSelectField
            label="Source*"
            name="SchoolMarketingId"
            required={true}
          />
        </InputBlock>
        <InputBlock>
          <SelectField
            label="Status*"
            name="LeadStatusId"
            placeholder="Select Type"
            referenceOptions="LstLeadStatus"
          />
        </InputBlock>

        <InputBlock>
          <DateField label="Trial 1" name="TrialClass1Utc" required={true} />

          <DateField label="Trial 2" name="TrialClass2Utc" required={true} />
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
    styles: state.school.styles,
  };
};

const connectedAddMarketingLeadForm = connect(
  AddMarketingLeadForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-student-rank-progression', // a unique identifier for this form
  validate,
})(connectedAddMarketingLeadForm);
