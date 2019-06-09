import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentPurchaseHistoryFetch,
  studentPurchaseHistoryResetState,
} from 'src/redux/actionCreators/pos/studentPurchaseHistory';

const payloadDisplayName = 'Student Purchase History';

class StudentPurchaseHistoryContainer extends React.Component {
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
    data: state.pos.studentPurchaseHistory,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentPurchaseHistoryFetch(id));
    },
  };
};

export default connect(
  StudentPurchaseHistoryContainer,
  mapStateToProps,
  mapDispatchToProps
);
