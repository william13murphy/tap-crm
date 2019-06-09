import React from 'react';
import GenericFormContainer from 'containers/GenericFormContainer';
import connect from 'src/redux/connect';

import {
  ownerPost,
  ownerPostFormReset,
} from 'src/redux/actionCreators/student/ownerPost';

const formPostAction = ownerPost;
const formResetAction = ownerPostFormReset;

// Write the fetch action to get the latest data
import { ownerFetch } from 'src/redux/actionCreators/student/owner';

const payloadDisplayName = 'Account Owner';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class StudentOwnerFormContainer extends React.Component {
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
    formState: state.student.ownerPost,
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
    dispatchActionOnClose: id => {
      dispatch(ownerFetch(id));
    },
  };
};

export default connect(
  StudentOwnerFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
