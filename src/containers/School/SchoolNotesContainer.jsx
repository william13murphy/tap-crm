import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolNotesFetch,
  schoolNotesResetState,
} from 'src/redux/actionCreators/school/notes';

const payloadDisplayName = 'School Notes';

class SchoolNotesContainer extends React.Component {
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
    data: state.school.notes,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolNotesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolNotesResetState());
    },
  };
};

export default connect(
  SchoolNotesContainer,
  mapStateToProps,
  mapDispatchToProps
);
