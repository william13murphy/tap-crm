import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateLetterSave,
  templateLetterFormReset,
} from 'src/redux/actionCreators/school/templateLetterPost';

import { allLetterTemplatesFetch } from 'src/redux/actionCreators/school/allLetterTemplates';

const payloadDisplayName = 'Template';

type TemplateLetterFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class TemplateLetterFormContainer extends React.Component {
  props: TemplateLetterFormContainerProps;
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
    formState: state.school.templateLetterPost,
    initialValues: state.school.letterTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateLetterSave(data));
    },
    dispatchFormReset: () => {
      dispatch(templateLetterFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(allLetterTemplatesFetch(id));
    },
  };
};

export default connect(
  TemplateLetterFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
