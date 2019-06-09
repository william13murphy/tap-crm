import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';

import {
  eomByMonthByYearFetch,
  eomByMonthByYearResetState,
} from 'src/redux/actionCreators/report/eomByMonthByYear';

const payloadDisplayName = 'EOM By Month By Year Report';

type EOMByMonthByYearReportFormContainerProps = {
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

class EOMByMonthByYearReportFormContainer extends React.Component {
  props: EOMByMonthByYearReportFormContainerProps;
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
    formState: state.report.eomByMonthByYear,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(eomByMonthByYearFetch(data));
    },
    dispatchFormReset: () => {
      dispatch(eomByMonthByYearResetState());
    },
  };
};

export default connect(
  EOMByMonthByYearReportFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
