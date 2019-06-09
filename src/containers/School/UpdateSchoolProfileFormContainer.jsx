import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  schoolProfileUpdate,
  schoolProfileFormReset,
} from 'src/redux/actionCreators/school/profileUpdate';

import { schoolProfileFetch } from 'src/redux/actionCreators/school/profile';

const formPostAction = schoolProfileUpdate;
const formResetAction = schoolProfileFormReset;

const payloadDisplayName = 'School Profile';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class UpdateSchoolProfileFormContainer extends React.Component {
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
    formState: state.school.profileUpdate,
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
      dispatch(schoolProfileFetch(schoolId));
    },
  };
};

export default connect(
  UpdateSchoolProfileFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
