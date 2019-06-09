import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';

import {
  allOutboxGroupFetch,
  allOutboxGroupResetState,
} from 'src/redux/actionCreators/school/allOutboxGroup';

const payloadDisplayName = 'School Outbox Group';

class SchoolOutboxMessagesContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.school.allOutboxGroup,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allOutboxGroupFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allOutboxGroupResetState());
    },
  };
};

export default connect(
  SchoolOutboxMessagesContainer,
  mapStateToProps,
  mapDispatchToProps
);
