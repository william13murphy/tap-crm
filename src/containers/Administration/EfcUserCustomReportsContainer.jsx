import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcUserCustomReportsFetch,
  efcUserCustomReportsResetState,
} from 'src/redux/actionCreators/administration/efcUserCustomReports';

const payloadDisplayName = 'EFC User Custom Reports';

class EfcUserCustomReportsContainer extends React.Component {
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
    data: state.administration.efcUserCustomReports,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(efcUserCustomReportsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(efcUserCustomReportsResetState());
    },
  };
};

export default connect(
  EfcUserCustomReportsContainer,
  mapStateToProps,
  mapDispatchToProps
);
