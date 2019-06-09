import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolSmartReportDetailFetch,
  schoolSmartReportDetailResetState,
} from 'src/redux/actionCreators/school/smartReportDetail';

const payloadDisplayName = 'Smart Report';

class SmartReportDetailContainer extends React.Component {
  props: {
    id: string,
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
    data: state.school.smartReportDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolSmartReportDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolSmartReportDetailResetState());
    },
  };
};

export default connect(
  SmartReportDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
