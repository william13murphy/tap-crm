import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateSMSSave,
  templateSMSFormReset,
} from 'src/redux/actionCreators/school/templateSMSPost';

import { allSMSTemplatesFetch } from 'src/redux/actionCreators/school/allSMSTemplates';

const payloadDisplayName = 'Template';

type TemplateSMSFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class TemplateSMSFormContainer extends React.Component {
  props: TemplateSMSFormContainerProps;
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
    formState: state.school.templateSMSPost,
    initialValues: state.school.smsTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateSMSSave(data));
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
  TemplateSMSFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
