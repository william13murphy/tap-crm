import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import SimplePieChart from 'components/Charts/SimplePieChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type RevenueByPackageProps = {
  report: {
    revenueByPackage: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  chartType: string,
  sideNav?: boolean,
};

class RevenueByPackage extends React.Component {
  props: RevenueByPackageProps;

  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      packages: [],
    };
  }

  componentDidMount() {
    const { revenueByPackage } = this.props.report;

    if (revenueByPackage.payload) {
      let revenue = [];

      let packagesObject;
      for (let key in revenueByPackage.payload) {
        packagesObject = revenueByPackage.payload[key];
        revenue.push({
          name: key,
          ...revenueByPackage.payload[key],
        });
      }

      let packages = Object.keys(packagesObject);
      this.setState({
        revenue,
        packages,
      });
    }
  }

  render() {
    return (
      <div className="RevenueByPackage">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            stackId="a"
            data={this.state.revenue}
            dataKeys={this.state.packages}
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
  RevenueByPackage,
  mapStateToProps
);
