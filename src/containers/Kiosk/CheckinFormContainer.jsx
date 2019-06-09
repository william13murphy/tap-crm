import React from 'react';
import connect from 'src/redux/connect';
import GenericStatefulFormContainer from '../GenericStatefulFormContainer';

import {
  checkinPost,
  checkinReset,
} from 'src/redux/actionCreators/kiosk/checkin';

import { postKioskCheckin } from 'api/kiosk';

const payloadDisplayName = 'Check In';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
};

class CheckinFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericStatefulFormContainer
        payloadDisplayName={payloadDisplayName}
        formPostEndpoint={postKioskCheckin}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.kiosk.checkin,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(checkinPost(data));
    },
    /** Not Reseting Form to maintain class state in redux */
    // dispatchFormReset: () => {
    //   dispatch(checkinReset());
    // },
  };
};

export default connect(
  CheckinFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
