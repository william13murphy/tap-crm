import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  studentsBirthdayFetch,
  studentsBirthdayResetState,
} from 'src/redux/actionCreators/report/studentsBirthday';

const alwaysFetch = false;

const payloadDisplayName = 'Students Birthday Report';

class StudentsBirthdayBySchoolByDaysContainer extends React.Component {
  props: {
    id: string,
    token: {
      payload: {
        SchoolId: string,
      },
    },
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={alwaysFetch}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.report.studentsBirthday,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: ({ schoolId, days }) => {
      dispatch(studentsBirthdayFetch({ schoolId, days }));
    },
    dispatchResetState: () => {
      dispatch(studentsBirthdayResetState());
    },
  };
};

export default connect(
  StudentsBirthdayBySchoolByDaysContainer,
  mapStateToProps,
  mapDispatchToProps
);
