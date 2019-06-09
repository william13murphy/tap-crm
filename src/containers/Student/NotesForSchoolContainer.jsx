import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  notesForSchoolFetch,
  notesForSchoolResetState,
} from 'src/redux/actionCreators/student/notesForSchool';

const payloadDisplayName = 'Internal EFC User Flagged Notes';

class NotesForSchoolContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams?: string,
    token: {
      payload: {
        UserId: string,
      },
    },
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
    data: state.student.notesForSchool,
    token: state.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(notesForSchoolFetch(id));
    },
    dispatchResetState: () => {
      dispatch(notesForSchoolResetState());
    },
  };
};

export default connect(
  NotesForSchoolContainer,
  mapStateToProps,
  mapDispatchToProps
);
