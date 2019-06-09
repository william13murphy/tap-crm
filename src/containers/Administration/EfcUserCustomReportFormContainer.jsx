import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserCustomReportPost,
  efcUserCustomReportPostReset,
} from 'src/redux/actionCreators/administration/efcUserCustomReportPost';

import { efcUserCustomReportFetch } from 'src/redux/actionCreators/administration/efcUserCustomReport';

const payloadDisplayName = 'EFC User Custom Report Post';

type EfcUserCustomReportFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserCustomReportFormContainer extends React.Component {
  props: EfcUserCustomReportFormContainerProps;
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
    formState: state.administration.efcUserCustomReportPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserCustomReportPost(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserCustomReportPostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserCustomReportFetch(id));
    },
  };
};

export default connect(
  EfcUserCustomReportFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
