import React from 'react';
import { Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';
import Spinner from 'components/DataLoading/Spinner';
import {
  tokenPost,
  // loginFormReset,
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
} from 'src/redux/actionCreators/token';

import PostFailMessage from 'components/DataLoading/PostFailMessage';
import TAPColor from 'assets/images/TAP_Color.svg';

type LoginFormContainerProps = {
  children: React.DOMElement<any>,
  token: {
    payload: {
      FirstLogin: string, // comes from server as a string: "True" or "False"
    },
    error?: boolean,
    status?: string,
  },
  // references: {},
  dispatchTokenPost: any,
  dispatchLoginFormReset: any,
  successRedirectUrl: string,
  firstLoginRedirectUrl: string,
};

class LoginFormContainer extends React.Component {
  props: LoginFormContainerProps;
  // componentWillUnmount() {
  //   this.props.dispatchLoginFormReset();
  // }
  renderFormError() {
    if (this.props.token.status === POST_FAIL) {
      return (
        <PostFailMessage
          error={this.props.token.payload}
          errorMessage={'We could not log you in.'}
          retryLink="/login/request-password"
          retryMessage="Reset your password"
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
      if (this.props.token.payload.FirstLogin === 'True') {
        return <Redirect to={this.props.firstLoginRedirectUrl} />;
      } else {
        return <Redirect to={this.props.successRedirectUrl} />;
      }
    } else {
      // POST_FAIL or null
      const childrenWithProps = React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          dispatchFormPost: this.props.dispatchTokenPost,
        })
      );
      return (
        <div className="LoginFormContainer">
          <div className="LoginPage__head">
            <img src={TAPColor} />
            <h2 className="LoginPage__title">Total Accountability Partner</h2>
            <p className="beta">*BETA</p>
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
    token: state.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTokenPost: data => {
      dispatch(tokenPost(data));
    },
    // dispatchLoginFormReset: () => {
    //   dispatch(loginFormReset());
    // },
  };
};

export default connect(LoginFormContainer, mapStateToProps, mapDispatchToProps);
