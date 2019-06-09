import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateSMSDelete,
  templateSMSFormReset,
} from 'src/redux/actionCreators/school/templateSMSDelete';

import { allSMSTemplatesFetch } from 'src/redux/actionCreators/school/allSMSTemplates';

const payloadDisplayName = 'Delete SMS Template';

type TemplateSMSDeleteContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class TemplateSMSDeleteContainer extends React.Component {
  props: TemplateSMSDeleteContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.templateSMSDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateSMSDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(templateSMSFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(allSMSTemplatesFetch(id));
    },
  };
};

export default connect(
  TemplateSMSDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
