import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  templateLetterCreate,
  templateLetterUpdate,
  templateLetterFormReset,
} from 'src/redux/actionCreators/utility/templateLetterPost';

import { allMessageTemplatesFetch } from 'src/redux/actionCreators/utility/allMessageTemplates';

const payloadDisplayName = 'Template';

type TemplateLetterFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchTemplateLetterCreate: any,
  dispatchTemplateLetterUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class TemplateLetterFormContainer extends React.Component {
  props: TemplateLetterFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchTemplateLetterUpdate
            : this.props.dispatchTemplateLetterCreate
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
    formState: state.utility.templateLetterPost,
    initialValues: state.utility.letterTemplate.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTemplateLetterCreate: data => {
      dispatch(templateLetterCreate(data));
    },
    dispatchTemplateLetterUpdate: data => {
      dispatch(templateLetterUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(templateLetterFormReset());
    },
    dispatchActionOnClose: () => {
      dispatch(allMessageTemplatesFetch());
    },
  };
};

export default connect(
  TemplateLetterFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
