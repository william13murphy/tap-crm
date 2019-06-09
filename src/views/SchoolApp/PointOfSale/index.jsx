import React from 'react';
import { Route, Redirect } from 'react-router';
import Module from 'components/Layout/Module';

import connect from 'src/redux/connect';
import { cartReset } from 'src/redux/actionCreators/pos/cart';
import { customerReset } from 'src/redux/actionCreators/pos/customer';

import SchoolPosContainer from 'containers/PointOfSale/SchoolPosContainer';
import SchoolStudentsContainer from 'containers/PointOfSale/SchoolStudentsContainer';

import OrderConfirmation from './OrderConfirmation';
import CustomerTypeModule from './CustomerType';
import SelectItemModule from './SelectItem';
import CheckoutModule from './Checkout';
import './styles.less';

type PointOfSaleModuleProps = {
  pos: Object,
  dispatchCartReset: Function,
  dispatchCustomerReset: Function,
  dispatchSchoolPosReset: Function,
  match: {
    path: string,
    url: string,
    params: {
      schoolId: string,
    },
  },
};

class PointOfSaleModule extends React.Component {
  props: PointOfSaleModuleProps;

  componentDidmount() {
    this.props.dispatchCartReset();
    this.props.dispatchCustomerReset();
  }

  render() {
    const schoolId = this.props.match.params.schoolId;
    return (
      <Module className="PointOfSaleModule">
        <Route
          exact={true}
          path={`${this.props.match.path}`}
          render={() => (
            <Redirect to={`${this.props.match.url}/customer-type`} />
          )}
        />
        <Route
          path={`${this.props.match.url}/customer-type`}
          render={() => (
            <SchoolStudentsContainer dispatchFetchParams={schoolId}>
              <CustomerTypeModule />
            </SchoolStudentsContainer>
          )}
        />

        <Route
          path={`${this.props.match.url}/select-item`}
          render={() => {
            let activeScreen = this.props.pos.customer.payload.screen;
            return (
              <div>
                {activeScreen === 'STUDENT' && (
                  <SchoolPosContainer dispatchFetchParams={schoolId}>
                    <SelectItemModule />
                  </SchoolPosContainer>
                )}
                {activeScreen !== 'STUDENT' && (
                  <SchoolPosContainer dispatchFetchParams={schoolId}>
                    <SelectItemModule />
                  </SchoolPosContainer>
                )}
              </div>
            );
          }}
        />
        <Route
          path={`${this.props.match.url}/checkout`}
          render={() => <CheckoutModule schoolId={schoolId} />}
        />
        <Route
          path={`${this.props.match.url}/summary`}
          render={() => <OrderConfirmation schoolId={schoolId} />}
        />
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
  PointOfSaleModule,
  mapStateToProps,
  mapDispatchToProps
);
