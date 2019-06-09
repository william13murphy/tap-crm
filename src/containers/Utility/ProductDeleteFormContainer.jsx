import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';

/* Start: Edit area for creating FormContainer */

import { productCreate } from 'src/redux/actionCreators/utility/productPost';

const formDeleteAction = productDelete;

const payloadDisplayName = 'Product';

type FormContainerProps = {
  update?: boolean,
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormDeleteAction: any,
  dispatchActionOnClose: any,
  initialValues: {},
};

class ProductDeleteFormContainer extends React.Component {
  props: FormContainerProps;
  render() {
    return (
      <GenericFormContainer
        formState={this.props.formState}
        payloadDisplayName={payloadDisplayName}
        dispatchFormPost={
          this.props.update
            ? this.props.dispatchFormUpdateAction
            : this.props.dispatchFormCreateAction
        }
        dispatchActionOnClose={this.props.dispatchActionOnClose}
      >
        {this.props.children}
      </GenericFormContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.utility.productPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormDeletection: data => {
      dispatch(formDeleteAction(data));
    },
  };
};

export default connect(
  ProductDeleteFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
