import React from 'react';
import DataCard from 'components/DataCard';
import { localCurrencyValue } from 'util/localization/localValues';
import ReadOnlyScreen from '../../ReadOnlyScreen';
import './styles.less';

type PlanDetailTotalsProps = {
  data: {},
};

const PlanDetailTotals = (props: PlanDetailTotalsProps) => {
  return (
    <DataCard className="PlanDetailTotals" title="Plan Totals">
      <ReadOnlyScreen readOnly={props.readOnly} />
      <table className="SubTotalTable default-table-plain">
        <tbody>
          <tr>
            <td className="label">Plan Subtotal</td>
            <td className="value">
              {localCurrencyValue(props.data.PlanSubtotal)}
            </td>
          </tr>
          <tr>
            <td className="label">Total Discounted</td>
            <td className="value">
              &ndash;
              {localCurrencyValue(props.data.TotalDiscount)}
            </td>
          </tr>
          <tr>
            <td className="label">Tax at {props.data.TaxRate}%</td>
            <td className="value">{localCurrencyValue(props.data.Tax)}</td>
          </tr>
        </tbody>
      </table>

      <table className="GrandTotalTable default-table-plain">
        <tbody>
          <tr>
            <td className="label">Grand Total</td>
            <td className="value">
              {localCurrencyValue(props.data.PlanTotal)}
            </td>
          </tr>
        </tbody>
      </table>
    </DataCard>
  );
};

export default PlanDetailTotals;
