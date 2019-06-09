import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  schoolStyleRateAdditionalClassPost,
  schoolStyleRateAdditionalClassFormReset,
} from 'src/redux/actionCreators/school/styleRateAdditionalClassPost';

import { schoolStyleRateAdditionalClassesFetch } from 'src/redux/actionCreators/school/styleRateAdditionalClassesMany';

const formPostAction = schoolStyleRateAdditionalClassPost;
const formResetAction = schoolStyleRateAdditionalClassFormReset;

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

class SchoolStyleRateAdditionalClassFormContainer extends React.Component {
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
    formState: state.school.styleRateAdditionalClassPost,
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
      dispatch(schoolStyleRateAdditionalClassesFetch(params));
    },
  };
};

export default connect(
  SchoolStyleRateAdditionalClassFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
