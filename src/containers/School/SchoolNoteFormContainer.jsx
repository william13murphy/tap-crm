import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolNotePost,
  schoolNoteFormReset,
} from 'src/redux/actionCreators/school/notePost';

import { schoolNotesFetch } from 'src/redux/actionCreators/school/notes';

const formPostAction = schoolNotePost;
const formResetAction = schoolNoteFormReset;

const payloadDisplayName = 'School Note';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: any,
};

class SchoolNoteFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.notePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: schoolId => {
      dispatch(schoolNotesFetch(schoolId));
    },
  };
};

export default connect(
  SchoolNoteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
