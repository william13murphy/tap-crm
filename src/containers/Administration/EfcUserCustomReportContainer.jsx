import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserCustomReportFetch,
  efcUserCustomReportResetState,
} from 'src/redux/actionCreators/administration/efcUserCustomReport';

const payloadDisplayName = 'EFC User Custom Report';

class EfcUserCustomReportContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.administration.efcUserCustomReport,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserCustomReportFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserCustomReportResetState());
    },
  };
};

export default connect(
  EfcUserCustomReportContainer,
  mapStateToProps,
  mapDispatchToProps
);
