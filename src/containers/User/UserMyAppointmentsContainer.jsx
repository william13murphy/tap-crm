import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  myAppointmentsFetch,
  myAppointmentsResetState,
} from 'src/redux/actionCreators/user/myAppointments';

const payloadDisplayName = 'Appointments';

class UserMyAppointmentsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
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
        data={this.props.data}
        dispatchFetch={this.props.dispatchFetch}
        dispatchFetchParams={this.props.id || this.props.userId}
        dispatchActionOnClose={this.props.dispatchReset}
        options={this.props.options || {}}
      >
        {this.props.children}
      </GenericFetchContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.user.myAppointments,
    userId: state.token.payload.UserId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(myAppointmentsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(myAppointmentsResetState());
    },
  };
};

export default connect(
  UserMyAppointmentsContainer,
  mapStateToProps,
  mapDispatchToProps
);
