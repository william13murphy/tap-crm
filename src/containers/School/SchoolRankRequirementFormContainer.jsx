import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolRankRequirementPost,
  schoolRankRequirementPostFormReset,
} from 'src/redux/actionCreators/school/rankRequirementPost';

import { schoolRankRequirementsFetch } from 'src/redux/actionCreators/school/rankRequirements';

const formPostAction = schoolRankRequirementPost;
const formResetAction = schoolRankRequirementPostFormReset;

const payloadDisplayName = 'School Rank Requirement';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: any,
};

class SchoolRankRequirementFormContainer extends React.Component {
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
    formState: state.school.rankRequirementPost,
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
      dispatch(schoolRankRequirementsFetch(schoolId));
    },
  };
};

export default connect(
  SchoolRankRequirementFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
