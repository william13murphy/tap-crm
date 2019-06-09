import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  studentPaymentAuthorizationPost,
  studentPaymentAuthorizationPostFormReset,
} from 'src/redux/actionCreators/student/paymentAuthorizationPost';

const payloadDisplayName = 'Plan Finalization';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class StudentAuthorizationSignatureFormContainer extends React.Component {
  props: FormContainerProps;
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
    formState: state.student.paymentAuthorizationPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(studentPaymentAuthorizationPost(data));
    },
    dispatchFormReset: () => {
      dispatch(studentPaymentAuthorizationPostFormReset());
    },
  };
};

export default connect(
  StudentAuthorizationSignatureFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
