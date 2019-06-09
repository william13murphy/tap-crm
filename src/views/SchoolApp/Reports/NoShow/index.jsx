import React from 'react';
import './styles.less';
import connect from 'src/redux/connect';
import NoShowGrid from './NoShowGrid';
// import SimpleLineChart from 'components/Charts/SimpleLineChart';
// import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type NoShowProps = {
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

class NoShow extends React.Component {
  props: NoShowProps;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const model = this.props.data.payload.map(student => {
      const attended = 'Attended';
      const noshow = 'NoShow';
      let weeksAbsent = 0;
      // Absent 1 week
      if (student.Week1 === noshow) {
        weeksAbsent += 1;
      }
      // Absent 2 weeks
      if (student.Week1 === noshow && student.Week2 === noshow) {
        weeksAbsent += 1;
      }
      // Absent 3 weeks
      if (
        student.Week1 === noshow &&
        student.Week2 === noshow &&
        student.Week3 === noshow
      ) {
        weeksAbsent += 1;
      }
      // Absent 4 weeks
      if (
        student.Week1 === noshow &&
        student.Week2 === noshow &&
        student.Week3 === noshow &&
        student.Week4 === noshow
      ) {
        weeksAbsent += 1;
      }
      return Object.assign({}, student, { weeksAbsent });
    });
    this.setState({ data: model });
  }

  render() {
    return (
      <div className="NoShow">
        <NoShowGrid data={this.state.data} schoolId={this.props.schoolId} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.noShow,
  };
}

export default connect(
  NoShow,
  mapStateToProps
);
