import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateEmailSave,
  templateEmailFormReset,
} from 'src/redux/actionCreators/school/templateEmailPost';

import { allEmailTemplatesFetch } from 'src/redux/actionCreators/school/allEmailTemplates';

const payloadDisplayName = 'Template';

type TemplateEmailFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class TemplateEmailFormContainer extends React.Component {
  props: TemplateEmailFormContainerProps;
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
    formState: state.school.templateEmailPost,
    initialValues: state.school.emailTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateEmailSave(data));
    },
    dispatchFormReset: () => {
      dispatch(templateEmailFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(allEmailTemplatesFetch(id));
    },
  };
};

export default connect(
  TemplateEmailFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
