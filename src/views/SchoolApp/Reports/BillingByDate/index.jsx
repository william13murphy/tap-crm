import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';
import styleVariables from 'styles/_variables';

type BillingByDateProps = {
  billingByDate: {
    payload: {},
  },
  columns: number,
  chartType: string,
  sideNav?: boolean,
};

class BillingByDate extends React.Component {
  props: BillingByDateProps;

  render() {
    return (
      <div className="BillingByDate">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            currency
            stackId="a"
            data={this.props.billingByDate.payload}
            dataKeys={['AmountBilled']}
            color={styleVariables.mossy_green}
          />
        </ResponsiveChartWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    billingByDate: state.report.billingByDate,
  };
}

export default connect(BillingByDate, mapStateToProps);
