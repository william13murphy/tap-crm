import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type EnrollmentByProgramProps = {
  report: {
    newEnrollmentByProgram: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class NewEnrollmentByProgram extends React.Component {
  props: EnrollmentByProgramProps;

  constructor(props) {
    super(props);
    this.state = {
      newEnrollment: [],
      programs: [],
    };
  }

  componentDidMount() {
    const { newEnrollmentByProgram } = this.props.report;

    if (newEnrollmentByProgram.payload) {
      let newEnrollment = [];
      let programsObject;
      for (let key in newEnrollmentByProgram.payload) {
        programsObject = newEnrollmentByProgram.payload[key];
        newEnrollment.push({
          name: key,
          ...newEnrollmentByProgram.payload[key],
        });
      }

      let programs = Object.keys(programsObject);
      this.setState({
        newEnrollment,
        programs,
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
          data={this.state.newEnrollment}
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

export default connect(
  NewEnrollmentByProgram,
  mapStateToProps
);
