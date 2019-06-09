import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  studentPromotionPost,
  studentPromotionPostFormReset,
} from 'src/redux/actionCreators/student/stylerankPromotion';

import { studentProgressionsFetch } from 'src/redux/actionCreators/student/progressions';
import { studentProgressionsByStyleFetch } from 'src/redux/actionCreators/student/progressionsByStyle';

const formPostAction = studentPromotionPost;
const formResetAction = studentPromotionPostFormReset;

const payloadDisplayName = 'Promotion';

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

class StudentPromotionFormContainer extends React.Component {
  props: FormContainerProps;
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
    formState: state.student.stylerankPromotion,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: closeParams => {
      dispatch(studentProgressionsFetch(closeParams.studentId));
      dispatch(studentProgressionsByStyleFetch(closeParams));
    },
  };
};

export default connect(
  StudentPromotionFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
