import React from 'react';
// import './styles.less';
import connect from 'src/redux/connect';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';
import SimpleLineChart from 'components/Charts/SimpleLineChart';

type LeadByStatusProps = {
  report: {
    leadByStatus: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class LeadByStatus extends React.Component {
  props: LeadByStatusProps;

  constructor(props) {
    super(props);
    this.state = {
      leads: [],
      programs: [],
    };
  }

  componentDidMount() {
    const { leadByStatus } = this.props.report;

    let programsObject;
    if (leadByStatus.payload) {
      let leads = [];
      for (let key in leadByStatus.payload) {
        leads.push({
          name: key,
          ...leadByStatus.payload[key],
        });

        programsObject = leadByStatus.payload[key];
      }
      let programs = Object.keys(programsObject);
      this.setState({ leads, programs });
    }
  }

  render() {
    return (
      <ResponsiveChartWrapper
        columns={this.props.columns}
        sideNav={this.props.sideNav}
      >
        <SimpleLineChart
          data={this.state.leads}
          dataKeys={this.state.programs}
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

export default connect(LeadByStatus, mapStateToProps);
