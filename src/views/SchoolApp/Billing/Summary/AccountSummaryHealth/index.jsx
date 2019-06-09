import React from 'react';
import connect from 'src/redux/connect';
import { localCurrencyValue } from 'util/localization/localValues';
import './styles.less';

type AccountSummaryHealthProps = {
  accountSummary: {
    payload: [{}],
  },
};

const AccountSummaryHealth = (props: AccountSummaryHealthProps) => {
  const schoolId = props.match.params.schoolId;
  const accountPayload = props.accountSummary.payload;
  return (
    <div className="AccountSummaryHealth">
      <div className="pt-callout pt-intent-success">
        <h3>
          EFT: <strong>{localCurrencyValue(accountPayload.EFT)}</strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-success">
        <h3>
          Card: <strong>{localCurrencyValue(accountPayload.Card)}</strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-success">
        <h3>
          Merchant:{' '}
          <strong>{localCurrencyValue(accountPayload.Merchant)}</strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-success">
        <h3>
          Cash: <strong>{localCurrencyValue(accountPayload.Cash)}</strong>
        </h3>
      </div>
      <div className="pt-callout pt-intent-primary">
        <h3>
          Total: <strong>{localCurrencyValue(accountPayload.Total)}</strong>
        </h3>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    accountSummary: state.school.accountSummary,
  };
}
export default connect(
  AccountSummaryHealth,
  mapStateToProps
);
