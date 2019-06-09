import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';

import {
  attendanceByStyleByDatePost,
  attendanceByStyleByDateResetState,
} from 'src/redux/actionCreators/report/attendanceByStyleByDate';
import { attendanceByStyleByDateReportUpdate } from 'src/redux/actionCreators/report/attendanceByStyleByDateReport';

const formPostAction = attendanceByStyleByDatePost;
const formResetAction = attendanceByStyleByDateResetState;
const payloadDisplayName = 'Attendance Report';

type AttendanceByStyleByDateReportFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {
    payload: [{}],
  },
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
  update?: boolean,
};

class AttendanceByStyleByDateReportFormContainer extends React.Component {
  props: AttendanceByStyleByDateReportFormContainerProps;
  render() {
    return (
      <GenericReportFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchActionOnSuccessParams={this.props.formState.payload}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.report.attendanceByStyleByDate,
    attendanceByStyleByDateReport: state.report.attendanceByStyleByDateReport,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnSuccess: data => {
      dispatch(attendanceByStyleByDateReportUpdate(data));
    },
  };
};

export default connect(
  AttendanceByStyleByDateReportFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
