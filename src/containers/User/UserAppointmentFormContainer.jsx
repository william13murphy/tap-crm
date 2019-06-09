import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { schoolLeadPost } from 'src/redux/actionCreators/school/leadPost';

import {
  userAppointmentCreate,
  userAppointmentUpdate,
  userAppointmentPostFormReset,
} from 'src/redux/actionCreators/user/appointmentPost';

import { myAppointmentsFetch } from 'src/redux/actionCreators/user/myAppointments';

const payloadDisplayName = 'Appointment';

type UserAppointmentFormContainerProps = {
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

class UserAppointmentFormContainer extends React.Component {
  props: UserAppointmentFormContainerProps;
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
      if (data.newLeadData.length > 0) {
        dispatch(schoolLeadPost(data.newLeadData));
      }
    },
    dispatchUserAppointmentUpdate: data => {
      dispatch(userAppointmentUpdate(data));
    },
    dispatchFormReset: () => {
      dispatch(userAppointmentPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(myAppointmentsFetch(id));
    },
  };
};

export default connect(
  UserAppointmentFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
