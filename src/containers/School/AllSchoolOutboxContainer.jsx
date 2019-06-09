import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allOutboxFetch,
  allOutboxResetState,
} from 'src/redux/actionCreators/school/allOutbox';

const payloadDisplayName = 'School Outbox';

class AllSchoolOutboxContainer extends React.Component {
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
    data: state.school.allOutbox,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allOutboxFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allOutboxResetState());
    },
  };
};

export default connect(
  AllSchoolOutboxContainer,
  mapStateToProps,
  mapDispatchToProps
);
