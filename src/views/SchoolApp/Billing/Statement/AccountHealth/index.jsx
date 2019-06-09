import React from 'react';
import connect from 'src/redux/connect';
import { localCurrencyValue } from 'util/localization/localValues';
import './styles.less';

type AccountHealthProps = {
  accountStatement: {
    payload: [{}],
  },
};

const AccountHealth = (props: AccountHealthProps) => {
  const schoolId = props.match.params.schoolId;
  const accountPayload = props.accountStatement.payload;
  return (
    <div className="AccountHealth">
      <div className="pt-callout pt-intent-success">
        <h3>
          Total Payments Received:{' '}
          <strong>
            {localCurrencyValue(accountPayload.TotalPaymentsReceived)}
          </strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-primary">
        <h3>
          Total Commission Received:{' '}
          <strong>
            {localCurrencyValue(accountPayload.TotalCommissionsReceived)}
          </strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-warning">
        <h3>
          Total Withdrawals:{' '}
          <strong>{localCurrencyValue(accountPayload.TotalWithdrawn)}</strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-danger">
        <h3>
          Total Payments Made:{' '}
          <strong>
            {localCurrencyValue(accountPayload.TotalPaymentsMade)}
          </strong>
        </h3>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    accountStatement: state.school.accountStatement,
  };
}
export default connect(
  AccountHealth,
  mapStateToProps
);
