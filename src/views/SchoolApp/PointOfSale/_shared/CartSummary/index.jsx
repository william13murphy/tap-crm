import React from 'react';
import connect from 'src/redux/connect';
import { Redirect } from 'react-router-dom';
import { localCurrencyValue } from 'util/localization/localValues';
import { dynamicBackRoute } from 'util/router';
import { cartUpdate } from 'src/redux/actionCreators/pos/cart';
import {
  calculateAmount,
  calculateTaxAmount,
  calculateAmountWithTax,
} from 'util/cart';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import CartSummaryDataGrid from './CartSummaryDataGrid';
import './styles.less';

class CartSummary extends React.Component {
  props: {
    showCheckout: boolean,
    updateData: Function,
    customer: Object,
    cartData: Array,
    onCheckout: Function,
    match: {
      url: string,
    },
  };
  state = {
    redirect: false,
  };

  onCheckout = () => {
    if (this.props.cartData.length === 0) return;
    this.setState({
      redirect: true,
    });
    this.props.dispatchCartUpdate(this.props.cartData);
  };

  render() {
    if (this.state.redirect) {
      const posUrl = dynamicBackRoute(this.props.match.url, '/select-item');
      return <Redirect to={`${posUrl}/checkout`} />;
    }

    let customer = this.props.customer.payload.details;
    let name = customer && customer.name ? customer.name : 'N/A';
    let email = customer && customer.email ? customer.email : 'N/A';
    let userType =
      this.props && this.props.customer
        ? this.props.customer.payload.screen
        : null;
    return (
      <div className="CartSummary">
        <div className="CartHeader">
          <div className="CartColumn">
            <div className="CartColumn__header">Name</div>
            <div className="CartColumn__item">{name}</div>
          </div>
          <div className="CartColumn">
            <div className="CartColumn__header">
              {userType === 'STUDENT' ? 'Id' : 'Email'}
            </div>
            <div className="CartColumn__item">
              {userType === 'STUDENT' ? customer.id : email}
            </div>
          </div>
        </div>
        <div className="CartBody">
          <div className="CartBody__header">Purchase Summary</div>
          <div className="CartList">
            {this.props.cartData.length === 0 && (
              <div className="CartList__item">No items in cart</div>
            )}
            {this.props.cartData.length > 0 && (
              <CartSummaryDataGrid data={this.props.cartData} />
            )}
          </div>
        </div>
        <div className="CartFooter">
          {this.props.showPaymentMethod && (
            <div className="CartAmount">
              <div className="CartAmount__header">Payment Method:</div>
              <div className="CartAmount__value">
                <ReferenceOutput
                  id={this.props.modeOfPaymentId}
                  listName="LstPaymentTypes"
                />
              </div>
            </div>
          )}
          <div className="CartAmount">
            <div className="CartAmount__header">Tax</div>
            <div className="CartAmount__value">
              {`${localCurrencyValue(calculateTaxAmount(this.props.cartData))}`}
            </div>
          </div>
          <div className="CartAmount">
            <div className="CartAmount__header">Total</div>
            <div className="CartAmount__value">
              {`${localCurrencyValue(
                calculateAmount(this.props.cartData) +
                  calculateTaxAmount(this.props.cartData)
              )}`}
            </div>
          </div>
          {this.props.showCheckout &&
            this.props.cartData.length > 0 && (
              <div className="Checkout">
                <button
                  type="button"
                  className="Checkout__button pt-button pt-intent-primary"
                  onClick={this.onCheckout}
                >
                  Checkout
                </button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatchCartUpdate: data => {
      dispatch(cartUpdate(data));
    },
  };
};

export default connect(
  CartSummary,
  mapStateToProps,
  mapDispatchToProps
);
