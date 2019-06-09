import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolOutboxLetterPost,
  schoolOutboxLetterFormReset,
} from 'src/redux/actionCreators/school/outboxLetterPost';

const payloadDisplayName = 'Letter';

type SchoolOutboxLetterFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class SchoolOutboxLetterFormContainer extends React.Component {
  props: SchoolOutboxLetterFormContainerProps;
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
    formState: state.school.outboxLetterPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolOutboxLetterPost(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolOutboxLetterFormReset());
    },
  };
};

export default connect(
  SchoolOutboxLetterFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
