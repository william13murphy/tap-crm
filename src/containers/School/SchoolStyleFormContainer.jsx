import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolStylePost,
  schoolStyleFormReset,
} from 'src/redux/actionCreators/school/stylePost';

import { schoolStylesFetch } from 'src/redux/actionCreators/school/styles';

const formPostAction = schoolStylePost;
const formResetAction = schoolStyleFormReset;

const payloadDisplayName = 'School Program';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: any,
};

class SchoolStyleFormContainer extends React.Component {
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
    formState: state.school.stylePost,
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
      dispatch(schoolStylesFetch(schoolId));
    },
  };
};

export default connect(
  SchoolStyleFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
