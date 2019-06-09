import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from 'containers/GenericStatefulFormContainer';

// import { additionalClassRateDelete } from 'src/redux/actionCreators/school/additionalClassRateDelete';
import { deleteSchoolStyleRateAdditionalClasses } from 'api';

import { schoolStyleRateAdditionalClassesFetch } from 'src/redux/actionCreators/school/styleRateAdditionalClassesMany';

const formPostEndpoint = deleteSchoolStyleRateAdditionalClasses;

const payloadDisplayName = 'Additional Class Rate Delete';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any,
  initialValues?: any,
};

class SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={formPostEndpoint}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.styleRateAdditionalClassesMany,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchActionOnSuccess: params => {
      dispatch(schoolStyleRateAdditionalClassesFetch(params));
    },
  };
};

export default connect(
  SchoolStyleRateAdditionalClassesDeleteStatefulFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
