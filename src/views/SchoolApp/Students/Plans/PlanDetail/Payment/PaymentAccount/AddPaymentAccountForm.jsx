import BankAccountPaymentFieldGroup from 'components/Forms/FieldGroups/Payment/BankAccount';
import CardPaymentFieldGroup from 'components/Forms/FieldGroups/Payment/Card';
import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import { log } from 'log';
import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import tempEnrollmentPlans from 'src/redux/data/tempEnrollmentPlans';
import './styles.less';


const { SCREENS, PaymentIds, OrdersStatusIds } = tempEnrollmentPlans;
type AddPaymentAccountFormProps = {
  studentId: string,
  references: {},
  utility: Object,
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  planId: any,
  token: {
    payload: {
      UserId: string,
      SchoolId: string,
    },
  },
  studentPackageDetail: {
    payload: {
      Id: string,
    },
  },
};

const validate = values => {
  const errors = {};

  if (!values.paymentTypeId) {
    errors.paymentTypeId = 'Please select a payment mode.';
  } else {
    if (
      values.paymentTypeId === PaymentIds.EFT ||
      values.paymentTypeId === PaymentIds.ACH
    ) {
      if (!values.AccountHolder) {
        errors.AccountHolder = 'Please add the account holder';
      }
      if (!values.BankName) {
        errors.BankName = 'Please add the Bank Name';
      }
      if (!values.AccountNumber) {
        errors.AccountNumber = 'Please add the Account Number';
      }
      if (!values.RoutingNumber) {
        errors.RoutingNumber = 'Please add the Routing Number';
      }
    } else {
      if (!values.paymentMode) {
        errors.paymentMode = 'Please select a payment mode.';
      }
      if (!values.CardHolder) {
        errors.CardHolder = 'Please enter card holder name.';
      }
      if (!values.CardNumber) {
        errors.CardNumber = 'Please enter card number.';
      } else if (values.CardNumber.length !== 16) {
        errors.CardNumber = 'Card number should be 16 digits long';
      }
      if (!values.CardCvs) {
        errors.CardCvs = 'Cv required';
      } else if (!/^[0-9]{3,4}$/.test(values.CardCvs)) {
        // Check whether the CSV check is working perfectly
        errors.CardCvs = 'Cv is not valid';
      }
      if (!values.CardExpirationMonth) {
        errors.CardExpirationMonth = 'Month Required';
      }
      if (!values.CardExpirationYear) {
        errors.CardExpirationYear = 'Year required';
      }
    }
  }

  return errors;
};

class AddPaymentAccountForm extends React.Component {
  props: AddPaymentAccountFormProps;
  constructor(props) {
    super(props);

    this.state = {
      showCardInput: false,
      showBankAccountInput: false,
    };
  }

  onSubmit = formData => {
    formData['Id'] = '00000000-0000-0000-0000-000000000000';
    formData['StudentPackageId'] = '96bfd1a3-dad0-416e-995b-cd9045e0e402'; // This is the Hardcode value of the StudentPackage ID of Owner Aaron Craine
    formData['planId'] = this.props.planId;
    formData['CountryId'] = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States
    formData['CurrencyTypeId'] = '3a2ea807-3ced-4fe9-9999-b415c9f3c0c3'; // United States;
    formData['IsActive'] = true;

    if (this.state.showCardInput) {
      formData['Id'] = '00000000-0000-0000-0000-000000000000';
      formData['StudentPackageId'] = '96bfd1a3-dad0-416e-995b-cd9045e0e402'; // This is the Hardcode value of the StudentPackage ID of Owner Aaron Craine
      formData['planId'] = this.props.planId;
      formData['CountryId'] = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States
      formData['CurrencyTypeId'] = '3a2ea807-3ced-4fe9-9999-b415c9f3c0c3'; // United States;
      formData['IsActive'] = true;
    } else if (this.state.showBankAccountInput) {
      formData['Id'] = '00000000-0000-0000-0000-000000000000';
      formData['StudentPackageId'] = '96bfd1a3-dad0-416e-995b-cd9045e0e402'; // This is the Hardcode value of the StudentPackage ID of Owner Aaron Craine
      formData['planId'] = this.props.planId;
      formData['CountryId'] = '2af6ff6c-8bb8-46f0-b27e-81def1b76b64'; // United States
      formData['CurrencyTypeId'] = '3a2ea807-3ced-4fe9-9999-b415c9f3c0c3'; // United States;
      formData['IsActive'] = true;
    }
    log('AddPaymentAccountForm onSubmit(): ', formData);
    this.props.dispatchFormPost(formData);
  };

  onChangeMode = (e, newValue) => {
    let showCardInput = [
      PaymentIds.CREDIT_CARD,
      PaymentIds.DEBIT_CARD,
    ].includes(newValue);
    let showBankAccountInput = [PaymentIds.EFT, PaymentIds.ACH].includes(
      newValue
    );
    this.setState({
      showCardInput,
      showBankAccountInput,
    });
  };

  render() {
    return (
      <form
        className="AddPaymentAccountForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <div
          className={`Payment ${
            this.state.showCardInput || this.state.showBankAccountInput
              ? 'no-padding'
              : null
          }`}
        >
          <div className="Payment__header">Select a Payment method</div>
          <div className="Payment__select">
            <SelectField
              onChange={this.onChangeMode}
              name="paymentTypeId"
              placeholder="Choose"
              referenceOptions="LstPaymentTypes"
            />

            {this.state.showCardInput && (
              <div>
                <SelectField
                  name="CardTypeId"
                  placeholder="Choose Card Type"
                  referenceOptions="LstCardTypes"
                />
                <CardPaymentFieldGroup showIcon={false} />
              </div>
            )}
            {this.state.showBankAccountInput && (
              <div>
                <SelectField
                  name="AccountTypeId"
                  placeholder="Choose Account Type"
                  referenceOptions="LstBankAccountTypes"
                />
                <BankAccountPaymentFieldGroup />
              </div>
            )}
          </div>
        </div>
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
    utility: state.utility,
    studentPackageDetail: state.student.packageDetail,
    initialValues: {
      paymentTypeId: '456c9dcc-4460-4ff9-9e11-d23750231788'
    }
  };
};


const initializedAddPaymentAccountForm =  reduxForm({
  form: 'add-account-owner',
  validate,
})(AddPaymentAccountForm);

export default  connect(
  initializedAddPaymentAccountForm,
  mapStateToProps
);


