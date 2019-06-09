import React from 'react';
import './styles.less';
import connect from 'src/redux/connect';
import SimpleLineChart from 'components/Charts/SimpleLineChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type CumulativeAttendanceProps = {
  report: {
    cumulativeAttendance: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class CumulativeAttendance extends React.Component {
  props: CumulativeAttendanceProps;

  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
    };
  }

  componentDidMount() {
    const { cumulativeAttendance } = this.props.report;

    if (cumulativeAttendance.payload) {
      let attendance = [];
      for (let key in cumulativeAttendance.payload) {
        attendance.push({
          name: key, //DAYS[key],
          Student: cumulativeAttendance.payload[key],
        });
      }
      this.setState({ attendance });
    }
  }

  render() {
    return (
      <div className="CumulativeAttendance">
        <div className="CumulativeAttendance__header">Feb 15 - Feb 21</div>
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleLineChart
            data={this.state.attendance}
            dataKeys={['Student']}
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

export default connect(CumulativeAttendance, mapStateToProps);
