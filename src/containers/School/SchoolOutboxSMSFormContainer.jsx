import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolOutboxSMSPost,
  schoolOutboxSMSFormReset,
} from 'src/redux/actionCreators/school/outboxSMSPost';

const payloadDisplayName = 'SMS';

type SchoolOutboxSMSFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
};

class SchoolOutboxSMSFormContainer extends React.Component {
  props: SchoolOutboxSMSFormContainerProps;
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
    formState: state.school.outboxSMSPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(schoolOutboxSMSPost(data));
    },
    dispatchFormReset: () => {
      dispatch(schoolOutboxSMSFormReset());
    },
  };
};

export default connect(
  SchoolOutboxSMSFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
