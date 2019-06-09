import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import {
  productCreate,
  productUpdate,
  productFormReset,
} from 'src/redux/actionCreators/utility/productPost';

import { allProductsFetch } from 'src/redux/actionCreators/utility/allProducts';

const formCreateAction = productCreate;
const formUpdateAction = productUpdate;
const formResetAction = productFormReset;

const payloadDisplayName = 'Product';

type FormContainerProps = {
  update?: boolean,
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormCreateAction: any,
  dispatchFormUpdateAction: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
  initialValues: {},
};

class ProductCreateUpdateFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchFormUpdateAction
            : this.props.dispatchFormCreateAction
        }
        {...this.props}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.utility.productPost,
    initialValues: state.utility.product.payload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormCreateAction: data => {
      dispatch(formCreateAction(data));
    },
    dispatchFormUpdateAction: data => {
      dispatch(formUpdateAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
    dispatchActionOnClose: () => {
      dispatch(allProductsFetch());
    },
  };
};

export default connect(
  ProductCreateUpdateFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
