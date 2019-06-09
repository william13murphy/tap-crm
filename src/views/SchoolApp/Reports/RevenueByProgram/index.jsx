import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import SimplePieChart from 'components/Charts/SimplePieChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type RevenueByProgramProps = {
  report: {
    revenueByProgram: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  chartType: string,
  sideNav?: boolean,
};

class RevenueByProgram extends React.Component {
  props: RevenueByProgramProps;

  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      programs: [],
      allPieValues: [],
    };
  }

  componentDidMount() {
    const { revenueByProgram } = this.props.report;

    if (revenueByProgram.payload) {
      let revenue = [];
      let allPieValues = [];

      let programsObject;
      for (let key in revenueByProgram.payload) {
        programsObject = revenueByProgram.payload[key];
        revenue.push({
          name: key,
          ...revenueByProgram.payload[key],
        });

        let pieValues = [];
        let values = revenueByProgram.payload[key];
        for (let name in values) {
          pieValues.push({
            name,
            value: values[name],
          });
        }
        allPieValues.push(pieValues);
      }

      let programs = Object.keys(programsObject);
      this.setState({
        revenue,
        programs,
        allPieValues,
      });
    }
  }

  render() {
    return (
      <div>
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            stackId="a"
            data={this.state.revenue}
            dataKeys={this.state.programs}
          />
        </ResponsiveChartWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
  };
}

export default connect(
  RevenueByProgram,
  mapStateToProps
);
