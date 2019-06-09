import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { clientDetailFetch } from 'src/redux/actionCreators/client/detail';

import {
  clientContactDelete,
  clientContactDeleteFormReset,
} from 'src/redux/actionCreators/client/contactDelete';

const formPostAction = clientContactDelete;
const formResetAction = clientContactDeleteFormReset;

const payloadDisplayName = 'Client Contact Delete';

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

class ClientContactDeleteContainer extends React.Component {
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
  return { formState: state.client.contactDelete };
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
      dispatch(clientDetailFetch(id));
    },
  };
};

export default connect(
  ClientContactDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
