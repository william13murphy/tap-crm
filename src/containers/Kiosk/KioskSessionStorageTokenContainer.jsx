import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  tokenFromCache,
  tokenReset,
} from 'src/redux/actionCreators/kiosk/token';
import { getCachedToken, resetSessionStorageToken } from 'util/token';
import { log } from 'log';

type KioskSessionStorageTokenContainerProps = {
  token: any,
  children: any,
  dispatchTokenFromCache: any,
  dispatchTokenReset: any,
};

class KioskSessionStorageTokenContainer extends React.Component {
  props: SessionStorageTokenContainerProps;
  state: {
    token: {} | null,
  };
  componentWillMount() {
    if (this.props.token && this.props.token.payload !== null) {
      log(
        'KioskSessionStorageTokenContainer: token already exists in state',
        this.props.token
      );
      return;
    } else {
      log(
        'KioskSessionStorageTokenContainer: no token exists in state, fetching cached token'
      );
      const access_token = getCachedToken();
      if (access_token) {
        log(
          'KioskSessionStorageTokenContainer: access_token Exists, dispatchingTokenFromCache...',
          access_token
        );
        this.props.dispatchTokenFromCache(access_token);
      } else {
        log('KioskSessionStorageTokenContainer: cached token DOES NOT EXIST');
        return;
      }
    }
  }
  componentWillUnmount() {
    // TODO: Re-evaluate resetting this for production. May need to create & use resetTokenCache instead. See util/token.js
    resetSessionStorageToken();
  }
  render() {
    if (this.props.token) {
      return (
        <div className="KioskSessionStorageTokenContainer">
          {this.props.children}
        </div>
      );
    } else {
      return <div> no session token found</div>;
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
    dispatchTokenFromCache: payload => {
      dispatch(tokenFromCache(payload));
    },
    dispatchTokenReset: () => {
      dispatch(tokenReset());
    },
  };
};

export default connect(
  KioskSessionStorageTokenContainer,
  mapStateToProps,
  mapDispatchToProps
);
