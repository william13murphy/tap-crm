import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  efcUserLetterTemplatePost,
  efcUserLetterTemplatePostReset,
} from 'src/redux/actionCreators/administration/efcUserLetterTemplatePost';

import { efcUserLetterTemplatesFetch } from 'src/redux/actionCreators/administration/efcUserLetterTemplates';

const payloadDisplayName = 'EFC User Letter Template Post';

type EfcUserLetterTemplateFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class EfcUserLetterTemplateFormContainer extends React.Component {
  props: EfcUserLetterTemplateFormContainerProps;
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
      dispatch(efcUserLetterTemplatePost(data));
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
  EfcUserLetterTemplateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
