import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateLetterDelete,
  templateLetterFormReset,
} from 'src/redux/actionCreators/school/templateLetterDelete';

import { allLetterTemplatesFetch } from 'src/redux/actionCreators/school/allLetterTemplates';

const payloadDisplayName = 'Delete Letter Template';

type TemplateLetterDeleteContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class TemplateLetterDeleteContainer extends React.Component {
  props: TemplateLetterDeleteContainerProps;
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
    formState: state.school.templateLetterDelete,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(templateLetterDelete(data));
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
  TemplateLetterDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
