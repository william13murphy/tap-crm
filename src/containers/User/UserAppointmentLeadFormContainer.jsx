import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

import {
  userAppointmentCreate,
  userAppointmentUpdate,
  userAppointmentPostFormReset,
} from 'src/redux/actionCreators/user/appointmentPost';

import {
  schoolLeadPost,
  schoolLeadPostFormReset,
} from 'src/redux/actionCreators/school/leadPost';

import { schoolLeadsFetch } from 'src/redux/actionCreators/school/leads';

const payloadDisplayName = 'Appointment';

type UserAppointmentLeadFormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchUserAppointmentCreate: any,
  dispatchUserAppointmentUpdate: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  update: boolean,
  initialValues: Object,
};

class UserAppointmentLeadFormContainer extends React.Component {
  props: UserAppointmentLeadFormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchUserAppointmentUpdate
            : this.props.dispatchUserAppointmentCreate
        }
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.user.appointmentPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUserAppointmentCreate: data => {
      dispatch(userAppointmentCreate(data));
      dispatch(schoolLeadPost(data));
    },
    dispatchUserAppointmentUpdate: data => {
      dispatch(userAppointmentUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(userAppointmentPostFormReset());
      dispatch(schoolLeadPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolLeadsFetch(id));
    },
  };
};

export default connect(
  UserAppointmentLeadFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
