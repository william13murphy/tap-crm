import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolSmartReportsFetch,
  schoolSmartReportsResetState,
} from 'src/redux/actionCreators/school/smartReports';

const payloadDisplayName = 'Smart Reports';

class SmartReportsContainer extends React.Component {
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
    data: state.school.smartReports,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolSmartReportsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolSmartReportsResetState());
    },
  };
};

export default connect(
  SmartReportsContainer,
  mapStateToProps,
  mapDispatchToProps
);
