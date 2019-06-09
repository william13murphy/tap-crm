import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

import { convertLeadToStudent } from 'src/redux/actionCreators/school/convertLeadToStudent';
import { searchFuzzyFetch } from 'src/redux/actionCreators/school/searchFuzzy';
import { anemicStudentsFetch } from 'src/redux/actionCreators/school/anemicStudents';
import { schoolLeadsFetch } from 'src/redux/actionCreators/school/leads';
import { convertSchoolLeadToStudent } from 'api';

const formPostEndpoint = convertSchoolLeadToStudent;
const payloadDisplayName = 'Convert School Lead To Student';

type ConvertLeadToStudentStatefulFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class ConvertLeadToStudentStatefulFormContainer extends React.Component {
  props: ConvertLeadToStudentStatefulFormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      >
        {this.props.children}
      </GenericStatefulFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.convertLeadToStudent,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: params => {
      dispatch(schoolLeadsFetch(params.SchoolId));
      dispatch(searchFuzzyFetch(params));
      dispatch(anemicStudentsFetch(params.SchoolId));
    },
  };
};

export default connect(
  ConvertLeadToStudentStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
