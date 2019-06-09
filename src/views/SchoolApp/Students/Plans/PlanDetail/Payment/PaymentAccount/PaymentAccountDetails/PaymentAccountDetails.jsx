import React from 'react';
import { Link } from 'react-router-dom';
import tempEnrollmentPlans from 'src/redux/data/tempEnrollmentPlans';
import './styles.less';


const { PaymentIds, AccountTypeIds } = tempEnrollmentPlans;

type paymentAccountsDataProps = {
  paymentAccounts: any,
  routes: any,
};

const PaymentAccountDetails = (props: paymentAccountsDataProps) => {
  switch (props.paymentAccounts.PaymentTypeId) {
    case PaymentIds.CREDIT_CARD:
      props.paymentAccounts['PaymentType'] = 'CREDIT CARD';
      break;
    case PaymentIds.DEBIT_CARD:
      props.paymentAccounts['PaymentType'] = 'DEBIT CARD';
      break;
    case PaymentIds.EFT:
      props.paymentAccounts['PaymentType'] = 'EFT';
      break;
    case PaymentIds.ACH:
      props.paymentAccounts['PaymentType'] = 'ACH';
      break;
  }

  switch (props.paymentAccounts.AccountTypeId) {
    case AccountTypeIds.PersonalChecking:
      props.paymentAccounts['AccountType'] = 'Personal Checking';
      break;
    case AccountTypeIds.PersonalSavings:
      props.paymentAccounts['AccountType'] = 'Personal Savings';
      break;
    case AccountTypeIds.BusinessChecking:
      props.paymentAccounts['AccountType'] = 'Business Checking';
      break;
    case AccountTypeIds.BusinessSavings:
      props.paymentAccounts['AccountType'] = 'Business Savings';
      break;
  }

  const cashPaymentTypeId = '456c9dcc-4460-4ff9-9e11-d23750231788';

  return (
    <div className="PaymentAccountDetails pt-card">
      <Link
        to={`${props.routes.url}/delete-payment-account`}
        className="EditAccountOwnerButton pt-button pt-intent-primary pt-icon-edit"
      >
        Delete Payment Account
      </Link>
      {props.paymentAccounts.CardHolder === null &&
      props.paymentAccounts.PaymentTypeId != cashPaymentTypeId ? (
        <table className="default-table-shaded">
          <tbody>
            <tr>
              <td>Payment Type</td>
              <td>{props.paymentAccounts.PaymentType}</td>
            </tr>
            <tr>
              <td>Account Type</td>
              <td>{props.paymentAccounts.AccountType}</td>
            </tr>
            <tr>
              <td>Account Number</td>
              <td>{props.paymentAccounts.AccountNumber}</td>
            </tr>
            <tr>
              <td>Account Holder</td>
              <td>{props.paymentAccounts.AccountHolder}</td>
            </tr>
            <tr>
              <td>Routing Number</td>
              <td>{props.paymentAccounts.RoutingNumber}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          {props.paymentAccounts.PaymentTypeId === cashPaymentTypeId ? (
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td>Payment Type</td>
                  <td>Cash</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="default-table-plain">
              <tbody>
                <tr>
                  <td>Payment Type</td>
                  <td>{props.paymentAccounts.PaymentType}</td>
                </tr>
                <tr>
                  <td>Card Holder</td>
                  <td>{props.paymentAccounts.CardHolder}</td>
                </tr>
                <tr>
                  <td>Card Number</td>
                  <td>{props.paymentAccounts.CardNumber}</td>
                </tr>
                <tr>
                  <td>Authorization Code</td>
                  <td>{props.paymentAccounts.CardCvs}</td>
                </tr>
                <tr>
                  <td>Expiration Date</td>
                  <td>
                    {props.paymentAccounts.CardExpirationMonth}/{
                      props.paymentAccounts.CardExpirationYear
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentAccountDetails;
