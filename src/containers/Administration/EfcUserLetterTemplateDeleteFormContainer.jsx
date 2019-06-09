import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserLetterTemplateDelete,
  efcUserLetterTemplatePostReset,
} from 'src/redux/actionCreators/administration/efcUserLetterTemplatePost';

import { efcUserLetterTemplatesFetch } from 'src/redux/actionCreators/administration/efcUserLetterTemplates';

const payloadDisplayName = 'EFC User Letter Template Delete';

type EfcUserLetterTemplateDeleteFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserLetterTemplateDeleteFormContainer extends React.Component {
  props: EfcUserLetterTemplateDeleteFormContainerProps;
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
    formState: state.administration.efcUserLetterTemplatePost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(efcUserLetterTemplateDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(efcUserLetterTemplatePostReset());
    },
    dispatchActionOnClose: id => {
      dispatch(efcUserLetterTemplatesFetch(id));
    },
  };
};

export default connect(
  EfcUserLetterTemplateDeleteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
