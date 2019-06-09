import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  smartReportGenerateExcelFetch,
  smartReportGenerateExcelResetState,
} from 'src/redux/actionCreators/school/smartReportGenerateExcelPost';

const payloadDisplayName = 'Generated Excel Smart Report';

class SmartReportGenerateExcelFormContainer extends React.Component {
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
    data: state.school.smartReportGenerateExcelPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: params => {
      dispatch(smartReportGenerateExcelFetch(params));
    },
    dispatchResetState: () => {
      dispatch(smartReportGenerateExcelResetState());
    },
  };
};

export default connect(
  SmartReportGenerateExcelFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
