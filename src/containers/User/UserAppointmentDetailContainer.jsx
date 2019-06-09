import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  userAppointmentDetailFetch,
  userAppointmentDetailResetState,
} from 'src/redux/actionCreators/user/appointmentDetail';

const payloadDisplayName = 'Appointment Detail';

class UserAppointmentDetailContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchReset: any,
    options?: {},
    userId: string,
    id: string,
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.user.appointmentDetail,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(userAppointmentDetailFetch(id));
    },
    dispatchResetState: () => {
      dispatch(userAppointmentDetailResetState());
    },
  };
};

export default connect(
  UserAppointmentDetailContainer,
  mapStateToProps,
  mapDispatchToProps
);
