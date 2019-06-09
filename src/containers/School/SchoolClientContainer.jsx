import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolClientFetch,
  schoolClientResetState,
} from 'src/redux/actionCreators/school/client';

const payloadDisplayName = 'School Client';

class SchoolClientContainer extends React.Component {
  props: {
    id: string,
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
    data: state.school.client,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolClientFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolClientResetState());
    },
  };
};

export default connect(
  SchoolClientContainer,
  mapStateToProps,
  mapDispatchToProps
);
