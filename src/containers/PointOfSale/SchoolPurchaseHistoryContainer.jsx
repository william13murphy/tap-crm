import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolPurchaseHistoryFetch,
  schoolPurchaseHistoryResetState,
} from 'src/redux/actionCreators/pos/schoolPurchaseHistory';

const payloadDisplayName = 'School Purchase History';

class SchoolPurchaseHistoryContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams?: string,
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
    data: state.pos.schoolPurchaseHistory,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(schoolPurchaseHistoryFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolPurchaseHistoryResetState());
    },
  };
};

export default connect(
  SchoolPurchaseHistoryContainer,
  mapStateToProps,
  mapDispatchToProps
);
