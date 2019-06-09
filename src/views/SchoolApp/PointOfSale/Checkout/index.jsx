import React from 'react';
import { Link } from 'react-router-dom';
import { dynamicBackRoute } from 'util/router';
import connect from 'src/redux/connect';
import { cartReset } from 'src/redux/actionCreators/pos/cart';
import { customerReset } from 'src/redux/actionCreators/pos/customer';

import SubNav from 'components/SubNav';
import Page from 'components/Layout/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import OrderFormContainer from 'containers/PointOfSale/OrderFormContainer';

import CartSummary from '../_shared/CartSummary';
import PaymentForm from './PaymentForm';
import './styles.less';

type CheckoutPageProps = {
  dispatchCartReset: Function,
  dispatchCustomerReset: Function,
  history: Object,
  location: Object,
  match: {
    url: string,
    params: {
      schoolId: string,
    },
  },
  pos: Object,
};

class CheckoutPage extends React.Component {
  props: CheckoutPageProps;

  render() {
    let { orderPost } = this.props.pos;
    const posUrl = dynamicBackRoute(this.props.match.url, '/checkout');
    const breadcrumbsData = [
      {
        to: `${posUrl}/customer-type`,
        label: 'Choose Customer Type',
        current: false,
      },
      {
        to: `${posUrl}/select-item`,
        label: 'Select Item',
        current: false,
      },
      {
        to: `${posUrl}/checkout`,
        label: 'Checkout',
        current: true,
      },
    ];
    return (
      <Page className="CheckoutPage" title="Checkout">
        <SubNav>
          <Breadcrumbs list={breadcrumbsData} />
        </SubNav>
        <div className="CheckoutContainer">
          <div className="Cart__summary">
            <CartSummary
              cartData={this.props.pos.cart.payload}
              showCheckout={false}
              customer={this.props.pos.customer}
            />
          </div>
          <OrderFormContainer redirectOnSuccess={`${posUrl}/summary`}>
            <PaymentForm pos={this.props.pos} schoolId={this.props.schoolId} />
          </OrderFormContainer>
        </div>
        <Link
          className="Checkout__button pt-button pt-intent-danger"
          to={`${posUrl}/select-item`}
        >
          Back
        </Link>
      </Page>
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
  CheckoutPage,
  mapStateToProps,
  mapDispatchToProps
);
