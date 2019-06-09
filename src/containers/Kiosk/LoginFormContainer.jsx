import React from 'react';
import { Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';
import Spinner from 'components/DataLoading/Spinner';
import {
  tokenPost,
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
} from 'src/redux/actionCreators/kiosk/token';

import PostFailMessage from 'components/DataLoading/PostFailMessage';

type LoginFormContainerProps = {
  children: React.DOMElement<any>,
  token: {
    payload: {
      FirstLogin: string, // comes from server as a string: "True" or "False"
    },
    error?: boolean,
    status?: string,
  },
  dispatchTokenPost: any,
  dispatchLoginFormReset: any,
  successRedirectUrl: string,
  firstLoginRedirectUrl: string,
};

class LoginFormContainer extends React.Component {
  props: LoginFormContainerProps;

  renderFormError() {
    if (this.props.token.status === POST_FAIL) {
      return (
        <PostFailMessage
          error={this.props.token.payload}
          errorMessage={'We could not log you in.'}
        />
      );
    } else {
      return null;
    }
  }
  render() {
    if (this.props.token.status === POST_START) {
      return <Spinner />;
    } else if (this.props.token.status === POST_SUCCESS) {
      return <Redirect to={this.props.successRedirectUrl} />;
    } else {
      const childrenWithProps = React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.props.dispatchTokenPost,
        })
      );
      return (
        <div className="LoginFormContainer">
          <div className="LoginPage__head">
            <h2 className="LoginPage__title">Kiosk Login</h2>
          </div>
          <div className="FormContainer">
            {this.renderFormError()}
            {childrenWithProps}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.kiosk.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTokenPost: data => {
      dispatch(tokenPost(data));
    },
  };
};

export default connect(
  LoginFormContainer,
  mapStateToProps,
  mapDispatchToProps
);
