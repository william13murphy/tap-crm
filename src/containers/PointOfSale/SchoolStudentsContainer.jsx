import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentsFetch,
  studentsResetState,
} from 'src/redux/actionCreators/pos/students';

const alwaysFetch = false;
const payloadDisplayName = 'Students';

class SchoolStudentsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    token: Array,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.pos.students,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(studentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentsResetState());
    },
  };
};

export default connect(
  SchoolStudentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
