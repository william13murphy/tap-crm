import React from 'react';
import './styles.less';
import connect from 'src/redux/connect';
import SimplePieChart from 'components/Charts/SimplePieChart';

type EnrollmentByProgramProps = {
  report: {
    enrollmentByProgram: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
};

class EnrollmentByProgram extends React.Component {
  props: EnrollmentByProgramProps;

  constructor(props) {
    super(props);
    this.state = {
      enrollments: [],
    };
  }

  componentDidMount() {
    const { enrollmentByProgram } = this.props.report;

    if (enrollmentByProgram.payload) {
      let enrollments = [];
      for (let key in enrollmentByProgram.payload) {
        enrollments.push({
          name: key,
          value: enrollmentByProgram.payload[key],
        });
      }
      this.setState({ enrollments });
    }
  }

  render() {
    return (
      <div className="StudentEnrollment">
        <SimplePieChart data={this.state.enrollments} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
  };
}

export default connect(EnrollmentByProgram, mapStateToProps);
