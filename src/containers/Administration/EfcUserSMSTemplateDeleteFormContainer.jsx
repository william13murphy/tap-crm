import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserSMSTemplateDelete,
  efcUserSMSTemplatePostReset,
} from 'src/redux/actionCreators/administration/efcUserSMSTemplatePost';

import { efcUserSMSTemplatesFetch } from 'src/redux/actionCreators/administration/efcUserSMSTemplates';

const payloadDisplayName = 'EFC User SMS Template Delete';

type EfcUserSMSTemplateDeleteFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserSMSTemplateDeleteFormContainer extends React.Component {
  props: EfcUserSMSTemplateDeleteFormContainerProps;
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
    formState: state.administration.efcUserSMSTemplatePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserSMSTemplateDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserSMSTemplatePostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserSMSTemplatesFetch(id));
    },
  };
};

export default connect(
  EfcUserSMSTemplateDeleteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
