import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserEmailTemplateDelete,
  efcUserEmailTemplatePostReset,
} from 'src/redux/actionCreators/administration/efcUserEmailTemplatePost';

import { efcUserEmailTemplatesFetch } from 'src/redux/actionCreators/administration/efcUserEmailTemplates';

const payloadDisplayName = 'EFC User Email Template Delete';

type EfcUserEmailTemplateDeleteFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserEmailTemplateDeleteFormContainer extends React.Component {
  props: EfcUserEmailTemplateDeleteFormContainerProps;
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
    formState: state.administration.efcUserEmailTemplatePost,
    initialValues: state.administration.efcUserEmailTemplates.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserEmailTemplateDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserEmailTemplatePostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserEmailTemplatesFetch(id));
    },
  };
};

export default connect(
  EfcUserEmailTemplateDeleteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
