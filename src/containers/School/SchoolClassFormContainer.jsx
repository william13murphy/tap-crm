import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolClassPost,
  schoolClassFormReset,
} from 'src/redux/actionCreators/school/classPost';

import { schoolClassesFetch } from 'src/redux/actionCreators/school/classes';
import { schoolClassDetailFetch } from 'src/redux/actionCreators/school/classDetail';

const formPostAction = schoolClassPost;
const formResetAction = schoolClassFormReset;

const payloadDisplayName = 'School Class';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any /** Need to configure it after integrating with class calendar grid table apis */,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SchoolClassFormContainer extends React.Component {
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
    formState: state.school.classPost,
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
    dispatchActionOnClose: params => {
      if (params.classId) {
        dispatch(schoolClassDetailFetch(params.classId));
      }
      if (params.schoolId) {
        dispatch(schoolClassesFetch(params.schoolId));
      }
    },
  };
};

export default connect(
  SchoolClassFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
