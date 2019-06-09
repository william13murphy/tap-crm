import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  schoolClockInOutPost,
  schoolClockInOutPostFormReset,
} from 'src/redux/actionCreators/school/clockInOutPost';

import { schoolClockInOutFetch } from 'src/redux/actionCreators/school/clockInOut';

const formPostAction = schoolClockInOutPost;
const formResetAction = schoolClockInOutPostFormReset;

const payloadDisplayName = 'School ClockInOut';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SchoolClockInOutFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        noToast
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.school.clockInOutPost,
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
    dispatchActionOnClose: userId => {
      dispatch(schoolClockInOutFetch(userId));
    },
  };
};

export default connect(
  SchoolClockInOutFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
