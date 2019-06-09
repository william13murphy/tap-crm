import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';

import {
  schoolSmartReportGeneratePost,
  schoolSmartReportGenerateFormReset,
} from 'src/redux/actionCreators/school/smartReportGeneratePost';

const payloadDisplayName = 'Generated Smart Report';

type SmartReportGenerateFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnSuccess: any,
  dispatchActionOnSuccessParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
};

class SmartReportGenerateFormContainer extends React.Component {
  props: SmartReportGenerateFormContainerProps;
  render() {
    return (
      <GenericReportFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchActionOnSuccessParams={this.props.formState.payload}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.smartReportGeneratePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolSmartReportGeneratePost(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolSmartReportGenerateFormReset());
    },
  };
};

export default connect(
  SmartReportGenerateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
