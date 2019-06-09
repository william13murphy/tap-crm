import React from 'react';
import connect from 'src/redux/connect';
import { Redirect } from 'react-router-dom';
import { cartReset } from 'src/redux/actionCreators/pos/cart';
import { customerReset } from 'src/redux/actionCreators/pos/customer';

import Module from 'components/Layout/Module';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import {
  calculateAmount,
  calculateTaxAmount,
  calculateAmountWithTax,
} from 'util/cart';
import CartSummary from '../_shared/CartSummary';
import './styles.less';

class OrderConfirmation extends React.Component {
  props: {
    dispatchCartReset: Function,
    dispatchCustomerReset: Function,
    schoolId: string,
    pos: {},
  };
  state = {
    redirect: false,
  };

  print() {
    window.print();
  }
  createNewOrder() {
    this.setState({
      redirect: true,
    });
    this.props.dispatchCartReset();
    this.props.dispatchCustomerReset();
  }

  render() {
    const schoolId = this.props.schoolId;
    if (this.state.redirect) {
      return <Redirect to={`/app/school-app/${schoolId}/pos/customer-type`} />;
    }
    return (
      <Module className="ConfirmationModule">
        <Page title="Billing">
          <PageHeader>
            <PageTitle>Order Summary</PageTitle>
          </PageHeader>
          <PageBody>
            <CartSummary
              cartData={this.props.pos.cart.payload}
              customer={this.props.pos.customer}
              modeOfPaymentId={
                this.props.pos.orderSummary.payload.ModeofPaymentId
              }
              showCheckout={false}
              showPaymentMethod
            />
            <div className="ConfirmActions">
              <button
                type="button"
                className="pt-button pt-intent-primary"
                onClick={this.print}
              >
                Print Receipt
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="pt-button pt-intent-primary"
                onClick={e => this.createNewOrder(e)}
              >
                Create a New Order
              </button>
            </div>
          </PageBody>
        </Page>
      </Module>
    );
  }
}

function mapStateToProps(state) {
  return {
    pos: state.pos,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    dispatchCartReset: () => {
      dispatch(cartReset());
    },
    dispatchCustomerReset: () => {
      dispatch(customerReset());
    },
  };
};
export default connect(
  OrderConfirmation,
  mapStateToProps,
  mapDispatchToProps
);
