import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { anemicStudentsFetch } from 'src/redux/actionCreators/school/anemicStudents';
import {
  userDelete,
  userDeleteFormReset,
} from 'src/redux/actionCreators/user/userDelete';

const payloadDisplayName = 'User Delete';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues?: any,
  update?: boolean,
};

class UserDeleteContainer extends React.Component {
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
  return { formState: state.user.userDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(userDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(userDeleteFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(anemicStudentsFetch(id));
    },
  };
};

export default connect(
  UserDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
