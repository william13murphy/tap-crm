import React from 'react';
import planPaymentStatuses from 'src/redux/data/planPaymentStatuses';

const PaymentStatusDisplay = paymentStatus => {
  let colorDisplay = planPaymentStatuses[paymentStatus].color;
  return <span className={`${colorDisplay} status`}>{paymentStatus}</span>;
};

export default PaymentStatusDisplay;
