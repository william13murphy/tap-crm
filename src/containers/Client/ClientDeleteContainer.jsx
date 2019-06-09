import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import { allClientsFetch } from 'src/redux/actionCreators/client/allClients';
import {
  clientDelete,
  clientDeleteFormReset,
} from 'src/redux/actionCreators/client/clientDelete';

const payloadDisplayName = 'Client Delete';

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

class ClientDeleteContainer extends React.Component {
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
  return { formState: state.client.clientDelete };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(clientDelete(data));
    },
    dispatchFormReset: () => {
      dispatch(clientDeleteFormReset());
    },
    dispatchActionOnClose: () => {
      dispatch(allClientsFetch());
    },
  };
};

export default connect(
  ClientDeleteContainer,
  mapStateToProps,
  mapDispatchToProps
);
