import React from 'react';
import { localCurrencyValue } from 'util/localization/localValues';
import TextField from 'components/Forms/TextField';
import './styles.less';

const StyleRateFieldsTable = ({ type, styleRate }) => {
  if (type === 'Subscription') {
    return (
      <table className="StyleRateFieldsTable default-table-striped">
        <tbody>
          <tr>
            <td className="label">Included Weekly Classes:</td>
            <td className="value">{styleRate.DefaultClasses}</td>
          </tr>
          <tr>
            <td className="label">Annual Cost:</td>
            <td className="value">
              <TextField
                currency
                name="StyleRateExtendedPrice"
                placeholder={
                  styleRate.AnnualCost
                    ? styleRate.AnnualCost.toFixed(2).toString()
                    : 0
                }
                type="number"
              />
            </td>
          </tr>
          <tr>
            <td className="label">Signup Fee:</td>
            <td className="value">
              <TextField
                currency
                name="StyleRateSignupExtendedPrice"
                placeholder={
                  styleRate.SignupCost &&
                  styleRate.SignupCost.toFixed(2).toString()
                }
                type="number"
              />
            </td>
          </tr>
          <tr>
            <td className="label">Cancellation Fee:</td>
            <td className="value">
              <TextField
                currency
                name="StyleRateCancellationExtendedPrice"
                placeholder={
                  styleRate.CancellationCost &&
                  styleRate.CancellationCost.toFixed(2).toString()
                }
                type="number"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else if (type === 'PunchCard') {
    return (
      <table className="StyleRateFieldsTable default-table-striped">
        <tbody>
          <tr>
            <td className="label">Included Classes:</td>
            <td className="value">{styleRate.DefaultClasses}</td>
          </tr>
          <tr>
            <td className="label">Cost:</td>
            <td className="value">
              <TextField
                currency
                name="StyleRateExtendedPrice"
                placeholder={
                  styleRate.AnnualCost &&
                  styleRate.AnnualCost.toFixed(2).toString()
                }
                type="number"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default StyleRateFieldsTable;
