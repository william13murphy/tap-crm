import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  eomExcelFetch,
  eomExcelResetState,
} from 'src/redux/actionCreators/report/eomExcel';

const alwaysFetch = true;

const payloadDisplayName = 'EOM Excel';

class EOMExcelContainer extends React.Component {
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
    data: state.report.eomExcel,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(eomExcelFetch(id));
    },
    dispatchResetState: () => {
      dispatch(eomExcelResetState());
    },
  };
};

export default connect(
  EOMExcelContainer,
  mapStateToProps,
  mapDispatchToProps
);
