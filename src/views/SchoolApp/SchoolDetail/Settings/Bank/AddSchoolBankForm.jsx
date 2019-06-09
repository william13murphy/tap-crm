import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';
import { log } from 'log';

type AddSchoolBankFormProps = {
  schoolId: string,
  references: {},
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  token: {
    payload: [{}],
  },
};

const validate = values => {
  const errors = {};
  if (!values.CurrencyTypeId) {
    errors.CurrencyTypeId = 'Please select a Currency Type.';
  }
  if (!values.CountryId) {
    errors.CountryId = 'Please select a Country.';
  }
  if (!values.AccountHolder) {
    errors.AccountHolder = 'Please enter an Account Holder.';
  }
  if (!values.AccountTypeId) {
    errors.AccountTypeId = 'Please select an Account Type.';
  }
  if (!values.AccountNumber) {
    errors.AccountNumber = 'Please enter an Account Number.';
  }
  if (!values.RoutingNumber) {
    errors.RoutingNumber = 'Please enter a Routing Number.';
  }

  return errors;
};

class AddSchoolBankForm extends React.Component {
  props: AddSchoolBankFormProps;
  onSubmit = formData => {
    formData['SchoolId'] = this.props.schoolId;
    log('AddSchoolBankForm onSubmit(): ', formData);

    if (this.props.initialValues === undefined) {
      formData['Token'] = this.props.token.payload.access_token;
    }

    this.props.dispatchFormPost(formData);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
        <InputBlock>
          <SelectField
            label="Currency Type*"
            name="CurrencyTypeId"
            placeholder="Select an Account Type"
            referenceOptions="LstCurrencyTypes"
          />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Country*"
            name="CountryId"
            placeholder="Select an Account Type"
            referenceOptions="LstCountries"
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="Account Holder*"
            name="AccountHolder"
            textarea={true}
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <SelectField
            label="Account Type*"
            name="AccountTypeId"
            placeholder="Select an Account Type"
            referenceOptions="LstBankAccountTypes"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="Account Number*"
            name="AccountNumber"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField
            label="Routing Number*"
            name="RoutingNumber"
            required={true}
          />
        </InputBlock>

        <InputBlock>
          <TextField label="SWIFT" name="SWIFT" />
          <TextField label="IBAN" name="IBAN" />
        </InputBlock>

        <InputBlock />

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
  };
};

const connectedAddSchoolBankForm = connect(
  AddSchoolBankForm,
  mapStateToProps
);

export default reduxForm({
  form: 'edit-school-bank', // a unique identifier for this form
  validate,
})(connectedAddSchoolBankForm);
