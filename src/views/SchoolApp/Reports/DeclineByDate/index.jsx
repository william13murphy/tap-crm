import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';
import styleVariables from 'styles/_variables';

type DeclineByDateProps = {
  declineByDate: {
    payload: {},
  },
  columns: number,
  chartType: string,
  sideNav?: boolean,
};

class DeclineByDate extends React.Component {
  props: DeclineByDateProps;

  render() {
    return (
      <div className="DeclineByDate">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            stackId="a"
            data={this.props.declineByDate.payload}
            dataKeys={['DeclinedPayments']}
            color={styleVariables.soft_violet}
          />
        </ResponsiveChartWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    declineByDate: state.report.declineByDate,
  };
}

export default connect(DeclineByDate, mapStateToProps);
