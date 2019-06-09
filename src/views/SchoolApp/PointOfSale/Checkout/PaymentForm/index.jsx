import React from 'react';
import moment from 'moment';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';
import { getReferenceItems, getReferenceItemOptions } from 'api/referenceItems';

import SelectField from 'components/Forms/SelectField';
import SubmitButton from 'components/Forms/SubmitButton';
import CardPaymentFieldGroup from 'components/Forms/FieldGroups/Payment/Card';
import {
  calculateAmount,
  calculateTaxAmount,
  calculateAmountWithTax,
} from 'util/cart';
import { log } from 'log';
import './styles.less';

type PaymentFormProps = {
  schoolId: string,
  dispatchFormPost: any,
  handleSubmit: any,
  pos: Object,
  references: Object,
};

const validate = values => {
  const errors = {};

  if (!values.paymentMode) {
    errors.paymentMode = 'Please select a payment mode.';
  }
  if (!values.CardHolder) {
    errors.CardHolder = 'Please enter card holder name.';
  }
  if (!values.CardNumber) {
    errors.CardNumber = 'Please enter card number.';
  }
  if (!values.CardCvs) {
    errors.CardCvs = 'Cv required';
  } else if (!/^[0-9]{3,4}$/.test(values.CardCvs)) {
    errors.CardCvs = 'Cv is not valid';
  }
  if (!values.CardExpirationMonth) {
    errors.CardExpirationMonth = 'Month Required';
  }
  if (!values.CardExpirationYear) {
    errors.CardExpirationYear = 'Year required';
  }
  return errors;
};

class PaymentForm extends React.Component {
  props: PaymentFormProps;
  state = {
    showCardInput: false,
  };

  onSubmit = data => {
    let cartData = this.props.pos.cart.payload;
    if (cartData.length === 0) return;
    let activeCustomerType = this.props.pos.customer.payload.screen; //STUDENT
    let activeUser = this.props.pos.customer.payload.details;
    let subTotal = calculateAmount(cartData);
    let taxAmount = calculateTaxAmount(cartData);
    let totalPrice = taxAmount + subTotal;
    let createdOn = moment().format('YYYY-MM-DD');
    let OrderDetails = cartData.map(item => {
      let itemTotalPrice = item.properties.SellingPrice * item.quantity;
      return {
        Id: '00000000-0000-0000-0000-000000000000',
        OrderId: '00000000-0000-0000-0000-000000000000',
        SkuId: item.id,
        Quantity: item.quantity,
        ExtendedPrice:
          item.properties.SellingPrice > 0 ? item.properties.SellingPrice : 1,
        TotalPrice: itemTotalPrice > 0 ? itemTotalPrice : 1,
      };
    });

    let customerTypes = getReferenceItems(
      'LstCustomerTypes',
      this.props.references
    );

    let customerType =
      activeCustomerType &&
      customerTypes.find(
        item =>
          item.Description.toLowerCase() === activeCustomerType.toLowerCase()
      );

    customerType = customerType
      ? customerType
      : { Id: '41949969-1db3-41b1-8b59-69288df8e92a' }; // Default to "public"

    let orderStatusTypes = getReferenceItems(
      'LstOrderStatusTypes',
      this.props.references
    );

    let orderStatus = orderStatusTypes.find(
      item => item.Id === '00434194-f7f7-4833-ab31-a6498bb27fff' // Pending
    );

    let firstName = '',
      lastName = '',
      email = '',
      phoneNumber = '',
      userId;
    if (activeCustomerType === 'STUDENT' && activeUser.properties) {
      let user = activeUser.properties;
      firstName = user.FirstName || '';
      lastName = user.LastName || '';
      email = user.Email ? user.Email : '';
      userId = user.UserId;
    }

    if (activeCustomerType === 'PUBLIC') {
      firstName = activeUser.name && activeUser.name.split(' ')[0];
      lastName = activeUser.name && activeUser.name.split(' ')[1];
      email = activeUser.email;
    }

    let formData = {
      OrderDetails,
      SchoolId: this.props.schoolId,
      CustomerTypeId: customerType.Id,
      UserId: userId,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNumber: phoneNumber,
      Note: '',
      SubTotal: subTotal > 0 ? subTotal : 1,
      TaxRate: 6,
      Tax: taxAmount,
      TotalPrice: totalPrice,
      ModeofPaymentId: data.paymentMode,
      PaymentReferenceId: null,
      PaymentStatus: '',
      OrderStatusId: orderStatus.Id,
    };
    //If ModeofPaymentId is NOT cash, then store all card data
    if (formData.ModeofPaymentId !== '456c9dcc-4460-4ff9-9e11-d23750231788') {
      formData.CardHolder = data.CardHolder;
      formData.CardNumber = data.CardNumber;
      formData.CardCvs = data.CardCvs;
      formData.CardExpirationMonth = data.CardExpirationMonth;
      formData.CardExpirationYear = data.CardExpirationYear.slice(-2);
    }
    log('onSubmit FormData', formData);
    this.props.dispatchFormPost(formData);
  };

  onChangeMode = (e, newValue) => {
    //If paymentMode is NOT equal to cash, then show card fields
    let showCardInput =
      newValue !== '456c9dcc-4460-4ff9-9e11-d23750231788' ? true : false;
    this.setState({ showCardInput });
  };

  render() {
    const supportedPaymentTypes = getReferenceItemOptions(
      'LstPaymentTypes',
      this.props.references
    ).filter(item => item.label !== 'EFT' && item.label !== 'ACH');
    return (
      <form
        className="PaymentContainer__form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="Payment__header">Select a Payment method</div>
        <div className="Payment__select">
          <SelectField
            onChange={this.onChangeMode}
            name="paymentMode"
            placeholder="Choose"
            options={supportedPaymentTypes}
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
        </div>
        <div className="Footer">
          <SubmitButton className="Checkout__button" intent="pt-intent-primary">
            Pay
          </SubmitButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

const connectedPaymentForm = connect(
  PaymentForm,
  mapStateToProps
);

export default reduxForm({
  form: 'payment', // a unique identifier for this form
  validate,
})(connectedPaymentForm);
