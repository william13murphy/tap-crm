import React from 'react';
import TextField from 'components/Forms/TextField';

const BankAccountPaymentFieldGroup = () => (
  <div>
    <TextField
      label=""
      type="text"
      placeholder="Account Holder Full Name"
      name="AccountHolder"
      required={true}
    />
    <TextField
      label=""
      type="text"
      placeholder="Bank Name"
      name="BankName"
      required={true}
    />
    <TextField
      label=""
      type="number"
      placeholder="Account Number"
      name="AccountNumber"
      required={true}
    />
    <TextField
      label=""
      type="number"
      placeholder="Routing Number"
      name="RoutingNumber"
      required={true}
    />
  </div>
);

export default BankAccountPaymentFieldGroup;
