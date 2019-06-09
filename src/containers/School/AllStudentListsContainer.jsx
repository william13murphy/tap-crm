import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  allStudentListsFetch,
  allStudentListsResetState,
} from 'src/redux/actionCreators/school/allStudentLists';

const payloadDisplayName = 'Student Lists';

class AllStudentListsContainer extends React.Component {
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
    data: state.school.allStudentLists,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(allStudentListsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(allStudentListsResetState());
    },
  };
};

export default connect(
  AllStudentListsContainer,
  mapStateToProps,
  mapDispatchToProps
);
