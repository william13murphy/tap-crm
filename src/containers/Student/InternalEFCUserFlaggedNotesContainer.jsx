import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  internalEFCUserFlaggedNotesFetch,
  internalEFCUserFlaggedNotesResetState,
} from 'src/redux/actionCreators/student/internalEFCUserFlaggedNotes';

const payloadDisplayName = 'Internal EFC User Flagged Notes';

class InternalEFCUserFlaggedNotesContainer extends React.Component {
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
        alwaysFetch={false}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.student.internalEFCUserFlaggedNotes,
    token: state.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(internalEFCUserFlaggedNotesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(internalEFCUserFlaggedNotesResetState());
    },
  };
};

export default connect(
  InternalEFCUserFlaggedNotesContainer,
  mapStateToProps,
  mapDispatchToProps
);
