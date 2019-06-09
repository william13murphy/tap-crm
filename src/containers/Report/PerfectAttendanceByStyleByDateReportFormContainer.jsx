import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';

import {
  perfectAttendanceByStyleByDatePost,
  perfectAttendanceByStyleByDateResetState,
} from 'src/redux/actionCreators/report/perfectAttendanceByStyleByDate';
import { perfectAttendanceByStyleByDateReportUpdate } from 'src/redux/actionCreators/report/perfectAttendanceByStyleByDateReport';

const formPostAction = perfectAttendanceByStyleByDatePost;
const formResetAction = perfectAttendanceByStyleByDateResetState;
const payloadDisplayName = 'Perfect Attendance Report';

type PerfectAttendanceByStyleByDateReportFormContainerProps = {
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

class PerfectAttendanceByStyleByDateReportFormContainer extends React.Component {
  props: PerfectAttendanceByStyleByDateReportFormContainerProps;
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
    formState: state.report.perfectAttendanceByStyleByDate,
    perfectAttendanceByStyleByDateReport:
      state.report.perfectAttendanceByStyleByDateReport,
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
      dispatch(perfectAttendanceByStyleByDateReportUpdate(data));
    },
  };
};

export default connect(
  PerfectAttendanceByStyleByDateReportFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
