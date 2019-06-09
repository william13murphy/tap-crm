import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentCalendarFetch,
  studentCalendarResetState,
} from 'src/redux/actionCreators/student/studentCalendar';

const payloadDisplayName = 'Student Calendar';

class StudentCalendarContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.studentCalendar,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(studentCalendarFetch(params));
    },
    dispatchResetState: () => {
      dispatch(studentCalendarResetState());
    },
  };
};

export default connect(
  StudentCalendarContainer,
  mapStateToProps,
  mapDispatchToProps
);
