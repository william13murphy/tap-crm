import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserEmailTemplatePost,
  efcUserEmailTemplatePostReset,
} from 'src/redux/actionCreators/administration/efcUserEmailTemplatePost';

import { efcUserEmailTemplatesFetch } from 'src/redux/actionCreators/administration/efcUserEmailTemplates';

const payloadDisplayName = 'EFC User Email Template Post';

type EfcUserEmailTemplateFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserEmailTemplateFormContainer extends React.Component {
  props: EfcUserEmailTemplateFormContainerProps;
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserEmailTemplatePost(data));
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
  EfcUserEmailTemplateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
