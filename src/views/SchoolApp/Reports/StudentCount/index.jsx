import React from 'react';
// import './styles.less';
import connect from 'src/redux/connect';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';
import SimpleLineChart from 'components/Charts/SimpleLineChart';

type StudentCountProps = {
  report: {
    studentCount: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class StudentCount extends React.Component {
  props: StudentCountProps;

  constructor(props) {
    super(props);
    this.state = {
      count: [],
    };
  }

  componentDidMount() {
    const { studentCount } = this.props.report;

    if (studentCount.payload) {
      let count = [];
      for (let key in studentCount.payload) {
        count.push({
          name: key, //MONTHS[key],
          Student: studentCount.payload[key],
        });
      }
      this.setState({ count });
    }
  }

  render() {
    return (
      <div className="StudentCount">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleLineChart data={this.state.count} dataKeys={['Student']} />
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

export default connect(StudentCount, mapStateToProps);
