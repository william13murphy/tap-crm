import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  schoolCreate,
  schoolFormReset,
} from 'src/redux/actionCreators/school/schoolPost';

import { allSchoolsFetch } from 'src/redux/actionCreators/school/allSchools';

const formPostAction = schoolCreate;
const formResetAction = schoolFormReset;

const payloadDisplayName = 'School';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
};

class CreateSchoolFormContainer extends React.Component {
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
    formState: state.school.schoolPost,
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
    dispatchActionOnClose: () => {
      dispatch(allSchoolsFetch());
    },
  };
};

export default connect(
  CreateSchoolFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
