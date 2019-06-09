import React from 'react';
import connect from 'src/redux/connect';
import SimpleLineChart from 'components/Charts/SimpleLineChart';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type RevenueBySourceProps = {
  report: {
    revenueBySource: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class RevenueBySource extends React.Component {
  props: RevenueBySourceProps;

  constructor(props) {
    super(props);
    this.state = {
      revenue: [],
      sources: [],
    };
  }

  componentDidMount() {
    const { revenueBySource } = this.props.report;

    if (revenueBySource.payload) {
      let revenue = [];
      let sourcesObject;
      for (let key in revenueBySource.payload) {
        sourcesObject = revenueBySource.payload[key];
        revenue.push({
          name: key,
          ...revenueBySource.payload[key],
        });
      }

      let sources = Object.keys(sourcesObject);
      this.setState({
        revenue,
        sources,
      });
    }
  }

  render() {
    return (
      <ResponsiveChartWrapper
        columns={this.props.columns}
        sideNav={this.props.sideNav}
      >
        <SimpleBarChart
          data={this.state.revenue}
          dataKeys={this.state.sources}
          stackId="a"
        />
      </ResponsiveChartWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
  };
}

export default connect(
  RevenueBySource,
  mapStateToProps
);
