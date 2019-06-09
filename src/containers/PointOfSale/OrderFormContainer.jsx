import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  orderPost,
  orderFormReset,
} from 'src/redux/actionCreators/pos/orderPost';
import { orderSummary } from 'src/redux/actionCreators/pos/orderSummary';

const payloadDisplayName = 'Order';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
};

class OrderFormContainer extends React.Component {
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
    formState: state.pos.orderPost,
    orderSummary: state.pos.orderSummary,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(orderPost(data));
      dispatch(orderSummary(data));
    },
    dispatchFormReset: () => {
      dispatch(orderFormReset());
    },
  };
};

export default connect(
  OrderFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
