import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  skuPost,
  skuPostFormReset,
} from 'src/redux/actionCreators/pos/skuPost';
import { schoolPosFetch } from 'src/redux/actionCreators/pos/schoolPos';

const payloadDisplayName = 'Inventory';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
  redirectOnSuccess: string,
};

class SkuFormContainer extends React.Component {
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
    formState: state.pos.skuPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(skuPost(data));
    },
    dispatchFormReset: () => {
      dispatch(skuPostFormReset());
    },
    dispatchActionOnClose: id => {
      dispatch(schoolPosFetch(id));
    },
  };
};

export default connect(
  SkuFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
