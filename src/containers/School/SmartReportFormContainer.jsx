import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolSmartReportPost,
  schoolSmartReportFormReset,
} from 'src/redux/actionCreators/school/smartReportPost';

import { schoolSmartReportsFetch } from 'src/redux/actionCreators/school/smartReports';

const payloadDisplayName = 'Smart Report';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any /** No parameters required in  allSchoolsFetch */,
  redirectOnSuccess: string,
};

class SmartReportFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.smartReportPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolSmartReportPost(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolSmartReportFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolSmartReportsFetch(id));
    },
  };
};

export default connect(
  SmartReportFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
