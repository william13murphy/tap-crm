import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateEmailCreate,
  templateEmailUpdate,
  templateEmailFormReset,
} from 'src/redux/actionCreators/utility/templateEmailPost';

import { allMessageTemplatesFetch } from 'src/redux/actionCreators/utility/allMessageTemplates';

const payloadDisplayName = 'Template';

type TemplateEmailFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchTemplateEmailCreate: any,
  dispatchTemplateEmailUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class TemplateEmailFormContainer extends React.Component {
  props: TemplateEmailFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchTemplateEmailUpdate
            : this.props.dispatchTemplateEmailCreate
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
    formState: state.utility.templateEmailPost,
    initialValues: state.utility.emailTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTemplateEmailCreate: data => {
      dispatch(templateEmailCreate(data));
    },
    dispatchTemplateEmailUpdate: data => {
      dispatch(templateEmailUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(templateEmailFormReset());
    },
    dispatchActionOnClose: () => {
      dispatch(allMessageTemplatesFetch());
    },
  };
};

export default connect(
  TemplateEmailFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
