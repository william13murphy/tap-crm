import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolRankRequirementDelete,
  schoolRankRequirementDeleteFormReset,
} from 'src/redux/actionCreators/school/rankRequirementDelete';

import { schoolRankRequirementsFetch } from 'src/redux/actionCreators/school/rankRequirements';

const payloadDisplayName = 'School Rank Requirement Delete';

type SchoolRankRequirementDeleteContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class SchoolRankRequirementDeleteContainer extends React.Component {
  props: SchoolRankRequirementDeleteContainerProps;
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
    formState: state.school.rankRequirementDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolRankRequirementDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolRankRequirementDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolRankRequirementsFetch(id));
    },
  };
};

export default connect(
  SchoolRankRequirementDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
