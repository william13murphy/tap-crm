import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateSMSCreate,
  templateSMSUpdate,
  templateSMSFormReset,
} from 'src/redux/actionCreators/utility/templateSMSPost';

import { allMessageTemplatesFetch } from 'src/redux/actionCreators/utility/allMessageTemplates';

const payloadDisplayName = 'Template';

type TemplateSMSFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchTemplateSMSCreate: any,
  dispatchTemplateSMSUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class TemplateSMSFormContainer extends React.Component {
  props: TemplateSMSFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchTemplateSMSUpdate
            : this.props.dispatchTemplateSMSCreate
        }
        {...this.props}
        initialValues={this.props.update ? this.props.initialValues : null}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.utility.templateSMSPost,
    initialValues: state.utility.smsTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTemplateSMSCreate: data => {
      dispatch(templateSMSCreate(data));
    },
    dispatchTemplateSMSUpdate: data => {
      dispatch(templateSMSUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(templateSMSFormReset());
    },
    dispatchActionOnClose: () => {
      dispatch(allMessageTemplatesFetch());
    },
  };
};

export default connect(
  TemplateSMSFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
