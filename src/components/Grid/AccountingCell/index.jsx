import React from 'react';
import './styles.less';
import { localCurrencyValue } from 'util/localization/localValues';

type AccountingCellProps = {
  value: number, // Value to be displayed in accounting format
  currency: boolean, // Display with currency symbol (true), or as a decimal (false)
};

const AccountingCell = ({ value, currency }) => {
  if (currency) {
    let currencyValue = 0;
    // If value is zero, don't show currency symbol & decimal places for better legibility.
    if (value && value != 0) {
      currencyValue = localCurrencyValue(value);
    }
    return <div className="AccountingCell">{currencyValue}</div>;
  } else {
    let decimalValue = 0;
    if (value && value != 0) {
      decimalValue = value.toFixed(2);
    }
    return <div className="AccountingCell">{decimalValue}</div>;
  }
};

export default AccountingCell;
