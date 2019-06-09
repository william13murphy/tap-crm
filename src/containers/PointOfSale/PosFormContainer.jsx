import React from 'react';
import connect from 'src/redux/connect';
import GenericFormContainer from 'containers/GenericFormContainer';
import {
  posPost,
  posPostFormReset,
} from 'src/redux/actionCreators/pos/posPost';

const payloadDisplayName = 'POS';

type FormContainerProps = {
  children: React.DOMElement<any>,
  formState: {},
  dispatchFormPost: any,
  dispatchFormReset: any,
  dispatchActionOnClose: any,
  dispatchActionOnCloseParams: any,
};

class PosFormContainer extends React.Component {
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
    formState: state.pos.posPost,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(posPost(data));
    },
    dispatchFormReset: () => {
      dispatch(posPostFormReset());
    },
  };
};

export default connect(
  PosFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
