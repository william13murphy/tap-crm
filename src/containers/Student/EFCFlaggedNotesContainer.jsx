import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  efcFlaggedNotesFetch,
  efcFlaggedNotesResetState,
} from 'src/redux/actionCreators/student/efcFlaggedNotes';

const payloadDisplayName = 'EFC Flagged Notes';

class EFCFlaggedNotesContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    options?: {},
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
    data: state.student.efcFlaggedNotes,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: () => {
      dispatch(efcFlaggedNotesFetch());
    },
    dispatchResetState: () => {
      dispatch(efcFlaggedNotesResetState());
    },
  };
};

export default connect(
  EFCFlaggedNotesContainer,
  mapStateToProps,
  mapDispatchToProps
);
