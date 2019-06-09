import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateEmailDelete,
  templateEmailFormReset,
} from 'src/redux/actionCreators/school/templateEmailDelete';

import { allEmailTemplatesFetch } from 'src/redux/actionCreators/school/allEmailTemplates';

const payloadDisplayName = 'Delete Email Template';

type TemplateEmailDeleteContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class TemplateEmailDeleteContainer extends React.Component {
  props: TemplateEmailDeleteContainerProps;
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
    formState: state.school.templateEmailDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateEmailDelete(data));
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
  TemplateEmailDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
