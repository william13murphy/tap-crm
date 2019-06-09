import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  studentNotesFetch,
  studentNotesResetState,
} from 'src/redux/actionCreators/student/notes';

const payloadDisplayName = 'Student Notes';

class StudentNotesContainer extends React.Component {
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
    data: state.student.notes,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: (id: string) => {
      dispatch(studentNotesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(studentNotesResetState());
    },
  };
};

export default connect(
  StudentNotesContainer,
  mapStateToProps,
  mapDispatchToProps
);
