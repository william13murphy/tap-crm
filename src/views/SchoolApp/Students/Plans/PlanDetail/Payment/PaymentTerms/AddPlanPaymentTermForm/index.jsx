import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import ValidatedInput from 'components/Forms/ValidatedInput';

import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import SelectField from 'components/Forms/SelectField';
import DateField from 'components/Forms/DateField';

import paymentFrequencyTypes from 'src/redux/data/paymentFrequencyTypes';

import { localCurrencyValue } from 'util/localization/localValues';
import { localCurrencySymbol } from 'util/localization/localValues';
import SwitchField from 'components/Forms/SwitchField';
import { getReferenceItemOptions } from 'api/referenceItems';

import moment from 'moment';

import './styles.less';

type AddPlanPaymentTermFormProps = {
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
      SchoolId: string,
    },
  },
  planDetail: any,
  update?: boolean,
};

const validate = (values, formProps) => {
  const errors = {};
  let initialValues = formProps.initialValues;

  if (!values.FirstName) {
    errors.FirstName = 'Please enter the first name.';
  }

  if (!values.LastName) {
    errors.LastName = 'Please enter the last name.';
  }

  if (!values.DownPaymentAmount) {
    // Zero down payment is ok! But zero is falsy, so must specify:
    if (values.DownPaymentAmount != 0) {
      errors.DownPaymentAmount = 'Please enter the Down Payment Amount.';
    }
  }

  let isFinalized = initialValues.Finalized;

  if (!isFinalized) {
    if (initialValues.PlanStartDate === null) {
      errors.PlanStartDate = 'Please enter the Plan Start Date.';
    } else if (
      !moment(values.PlanStartDate).isSameOrAfter(moment().startOf('day'))
    ) {
      errors.PlanStartDate = 'Plan Start Date must be in future';
    }
    if (initialValues.PaymentStartDate === null) {
      errors.PaymentStartDate = 'Please enter the Payment Start Date.';
    } else if (
      !moment(values.PaymentStartDate).isSameOrAfter(moment().startOf('day'))
    ) {
      errors.PaymentStartDate = 'Payment Start Date must be in the future';
    }
  }

  if (!values.PaymentFrequencyId) {
    errors.PaymentFrequencyId = 'Please enter the Payment Frequency type';
  }

  if (!values.NumberOfPayment) {
    errors.NumberOfPayment = 'Please enter the Number of Payments';
  }

  if (!values.PlanEndDate) {
    errors.PlanEndDate = 'Please enter the Plan End Date';
  } else if (
    !moment(values.PlanEndDate).isSameOrAfter(moment(values.PlanStartDate))
  ) {
    errors.PlanEndDate = 'Plan End Date cannot be less then Plan Start date';
  }

  return errors;
};

class AddPlanPaymentTermForm extends React.Component {
  props: AddPlanPaymentTermFormProps;
  constructor(props) {
    super(props);

    this.state = {
      isAutoRenewal: true,
      endDateLabel: 'Plan End Date*',
      paymentFrequencyTypes: [],
      numberOfPayments: ' ',
      downPaymentAmount: 0,
      paymentAmountPreview: 0,
    };
  }
  onSubmit = formData => {
    if (this.state.isAutoRenewal) {
      formData['PlanEndDate'] = '9999-12-31T00:00:00';
      formData['RenewalTypeId'] = '613482ec-658b-40cd-9847-85cf960be760'; // Auto
    } else {
      formData['RenewalTypeId'] = '41427c10-6cbe-4e95-b295-4598cb2b5f45'; // Manual/Authorize
      delete formData.RenewalDate;
    }

    formData['NumberOfPayment'] = this.state.numberOfPayments;

    this.props.dispatchFormPost(formData);
  };

  handleFrequencyPaymentTypeChange = value => {
    this.state.paymentFrequencyTypes.map((element, index) => {
      if (element.value === value) {
        this.setState({
          numberOfPayments: paymentFrequencyTypes[element.label],
          paymentAmountPreview:
            (this.props.planDetail.PlanTotal - this.state.downPaymentAmount) /
            paymentFrequencyTypes[element.label],
        });
      }
    });
  };

  calculatePaymentAmount(planTotal, downPaymentAmount, numberOfPayments) {
    return (planTotal - downPaymentAmount) / numberOfPayments;
  }

  handleNumberOfPaymentsChange = value => {
    this.setState({
      numberOfPayments: value,
      paymentAmountPreview: this.calculatePaymentAmount(
        this.props.planDetail.PlanTotal,
        this.state.downPaymentAmount,
        value
      ),
    });
  };

  handleDownPaymentAmountChange = value => {
    this.setState({
      downPaymentAmount: value,
      paymentAmountPreview: this.calculatePaymentAmount(
        this.props.planDetail.PlanTotal,
        value,
        this.state.numberOfPayments
      ),
    });
  };

  componentWillMount() {
    this.setState({
      paymentFrequencyTypes: getReferenceItemOptions(
        'LstPaymentFrequencies',
        this.props.references
      ),
      numberOfPayments: this.props.initialValues.NumberOfPayment,
      downPaymentAmount: this.props.update
        ? this.props.initialValues.DownPaymentAmount
        : this.props.planDetail.StyleSignupTotal,
      paymentAmountPreview: this.calculatePaymentAmount(
        this.props.planDetail.PlanTotal,
        this.props.initialValues.DownPaymentAmount,
        this.props.initialValues.NumberOfPayment
      ),
    });
  }

  componentDidMount() {
    if (this.props.initialValues.PlanEndDate === '9999-12-31T00:00:00') {
      this.props.initialValues.PlanEndDate = '';
    }
  }

  render() {
    let isDisabled = this.props.initialValues.Finalized;

    return (
      <form
        className="AddPlanPaymentTermForm"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        method="POST"
      >
        <InputBlock>
          <DateField
            label="Plan Start Date*"
            name="PlanStartDate"
            textarea={false}
            required={true}
            disabled={isDisabled}
          />
          <DateField
            label="Payment Start Date*"
            name="PaymentStartDate"
            textarea={false}
            required={true}
            disabled={isDisabled}
          />
        </InputBlock>
        <InputBlock>
          <SwitchField
            name="isAutoRenewal"
            label="Auto Renewal"
            checked={this.state.isAutoRenewal}
            onClick={() => {
              let isAutoRenewal = this.state.isAutoRenewal;
              this.setState({
                isAutoRenewal: !isAutoRenewal,
              });
            }}
          />
          <div>
            {this.state.isAutoRenewal ? (
              <DateField
                label="Renewal Date*"
                name="RenewalDate"
                required={true}
              />
            ) : (
              <DateField
                label={this.state.endDateLabel}
                name="PlanEndDate"
                textarea={false}
                required={true}
                value={false}
              />
            )}
          </div>
        </InputBlock>
        <InputBlock>
          <TextField
            input={{ min: 0, step: '.01' }}
            component={ValidatedInput}
            label="Down Payment Amount*"
            name="DownPaymentAmount"
            type="number"
            textarea={false}
            required={true}
            value={this.state.downPaymentAmount}
            currency={localCurrencySymbol()}
            onChange={(event, value) =>
              this.handleDownPaymentAmountChange(value)
            }
          />
          <SelectField
            label="Payment Frequency*"
            name="PaymentFrequencyId"
            placeholder="Select a Payment Frequency"
            options={this.state.paymentFrequencyTypes}
            required={true}
            onChange={(event, value) => {
              this.handleFrequencyPaymentTypeChange(value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <TextField
            label="Number of Payments*"
            name="NumberOfPayment"
            type="number"
            textarea={false}
            required={true}
            value={this.state.numberOfPayments}
            onChange={(event, value) =>
              this.handleNumberOfPaymentsChange(value)
            }
          />
        </InputBlock>
        <div className="RecurringPayment__preview">
          <span className="RecurringPayment__title">
            Recurring Payment Amount:
          </span>
          <span className="RecurringPayment__value">
            {localCurrencyValue(this.state.paymentAmountPreview)}
          </span>
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
    references: state.utility.references,
  };
};

const connectedAddPlanPaymentTermForm = connect(
  AddPlanPaymentTermForm,
  mapStateToProps
);

export default reduxForm({
  form: 'add-plan-payment-term', // a unique identifier for this form
  validate,
})(connectedAddPlanPaymentTermForm);
