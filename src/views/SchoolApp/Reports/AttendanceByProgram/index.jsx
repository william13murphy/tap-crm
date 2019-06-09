import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type AttendanceByProgramProps = {
  report: {
    attendanceByProgram: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class AttendanceByProgram extends React.Component {
  props: AttendanceByProgramProps;

  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      programs: [],
    };
  }

  componentDidMount() {
    const { attendanceByProgram } = this.props.report;

    if (attendanceByProgram.payload) {
      let attendance = [];
      let programsObject;
      for (let key in attendanceByProgram.payload) {
        programsObject = attendanceByProgram.payload[key];
        attendance.push({
          name: key,
          ...attendanceByProgram.payload[key],
        });
      }

      let programs = Object.keys(programsObject);
      this.setState({
        attendance,
        programs,
      });
    }
  }

  render() {
    return (
      <div className="StudentAttendance">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            data={this.state.attendance}
            dataKeys={this.state.programs}
            stackId="a"
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
  AttendanceByProgram,
  mapStateToProps
);
