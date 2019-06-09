import React from 'react';
import './styles.less';
import connect from 'src/redux/connect';
import StudentsUnpaidGrid from './StudentsUnpaidGrid';

type StudentsUnpaidProps = {
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

class StudentsUnpaid extends React.Component {
  props: StudentsUnpaidProps;

  render() {
    return (
      <div className="StudentsUnpaid">
        <StudentsUnpaidGrid data={this.props.data.payload} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.studentUnpaid,
  };
}

export default connect(
  StudentsUnpaid,
  mapStateToProps
);
