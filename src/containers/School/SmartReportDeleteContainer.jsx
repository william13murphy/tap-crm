import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  smartReportDelete,
  smartReportDeleteFormReset,
} from 'src/redux/actionCreators/school/smartReportDelete';
import { schoolSmartReportsFetch } from 'src/redux/actionCreators/school/smartReports';

const payloadDisplayName = 'Smart Report Delete';

type SmartReportDeleteContainerProps = {
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

class SmartReportDeleteContainer extends React.Component {
  props: SmartReportDeleteContainerProps;
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
    formState: state.school.smartReportDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(smartReportDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(smartReportDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolSmartReportsFetch(id));
    },
  };
};

export default connect(
  SmartReportDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
