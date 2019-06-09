import React from 'react';
import connect from 'src/redux/connect';
import { tokenFromCache, tokenReset } from 'src/redux/actionCreators/token';
import { getCachedToken, resetSessionStorageToken } from 'util/token';
import { setRoleEnvironmentVariable } from 'util/environment';
import tokenTest from 'util/auth/tokenTest';
import { log } from 'log';
import PostFailMessage from 'components/DataLoading/PostFailMessage';

type SessionStorageTokenContainerProps = {
  token: any,
  children: any,
  dispatchTokenFromCache: any,
  dispatchTokenReset: any,
};

class SessionStorageTokenContainer extends React.Component {
  props: SessionStorageTokenContainerProps;
  state = {
    errorMessage: null,
  };

  componentWillMount() {
    if (this.props.token && this.props.token.payload !== null) {
      log(
        'SessionStorageTokenContainer: token already exists in state',
        this.props.token
      );
    } else {
      log(
        'SessionStorageTokenContainer: no token exists in state, fetching cached token'
      );
      const access_token = getCachedToken();
      if (access_token) {
        log(
          'SessionStorageTokenContainer: access_token Exists, dispatchingTokenFromCache...',
          access_token
        );
        this.props.dispatchTokenFromCache(access_token);
      } else {
        log('SessionStorageTokenContainer: cached token DOES NOT EXIST');
      }
    }
  }
  componentWillUnmount() {
    // TODO: Re-evaluate resetting this for production. May need to create & use resetTokenCache instead. See util/token.js
    resetSessionStorageToken();
  }

  throwTokenError(errorMessage) {
    // Log the user out:
    resetSessionStorageToken();
    this.props.dispatchTokenReset();

    // TODO: Dispatch this error to Sentry
    this.setState({ errorMessage });
  }
  getTokenStatus() {
    if (this.props.token && this.props.token.payload !== null) {
      // Test the token to make sure it has the required "Role" attribute:
      const tokenStatus = tokenTest(this.props.token.payload);
      if (tokenStatus.valid === true) {
        return true;
      } else {
        this.throwTokenError(tokenStatus.error);
        return false;
      }
    } else {
      // No token exists yet. Need to show login screen.
      return true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.token.payload !== nextProps.token.payload &&
      this.state.errorMessage
    ) {
      this.setState({ errorMessage: null });
    }
  }

  render() {
    if (this.props.token) {
      log('%c>>> TOKEN', 'color: magenta', this.props.token.payload);

      if (this.getTokenStatus()) {
        if (this.props.token.payload) {
          setRoleEnvironmentVariable(this.props.token.payload.Role); // Set Role attribute for WalkMe
        }
        return (
          <div className="SessionStorageTokenContainer">
            {this.state.errorMessage && (
              <PostFailMessage errorMessage={this.state.errorMessage} />
            )}
            {this.props.children}
          </div>
        );
      } else {
        return null;
      }
    } else {
      return null;
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
    dispatchTokenFromCache: payload => {
      dispatch(tokenFromCache(payload));
    },
    dispatchTokenReset: () => {
      dispatch(tokenReset());
    },
  };
};

export default connect(
  SessionStorageTokenContainer,
  mapStateToProps,
  mapDispatchToProps
);
