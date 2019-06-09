import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolOutboxEmailPost,
  schoolOutboxEmailFormReset,
} from 'src/redux/actionCreators/school/outboxEmailPost';

const payloadDisplayName = 'Email';

type SchoolOutboxEmailFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class SchoolOutboxEmailFormContainer extends React.Component {
  props: SchoolOutboxEmailFormContainerProps;
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
    formState: state.school.outboxEmailPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolOutboxEmailPost(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolOutboxEmailFormReset());
    },
  };
};

export default connect(
  SchoolOutboxEmailFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
