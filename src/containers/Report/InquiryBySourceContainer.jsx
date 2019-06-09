import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  inquiryBySourceFetch,
  inquiryBySourceResetState,
} from 'src/redux/actionCreators/report/inquiryBySource';

const alwaysFetch = false;

const payloadDisplayName = 'Report';

class InquiryBySourceContainer extends React.Component {
  props: {
    id: string,
    dispatchFetchParams: {
      schoolId: string,
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
    data: state.report.inquiryBySource,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(inquiryBySourceFetch(id));
    },
    dispatchResetState: () => {
      dispatch(inquiryBySourceResetState());
    },
  };
};

export default connect(
  InquiryBySourceContainer,
  mapStateToProps,
  mapDispatchToProps
);
