import React from 'react';
import { Redirect } from 'react-router-dom';
import connect from 'src/redux/connect';
import { tokenReset } from 'src/redux/actionCreators/token';
import { getCachedToken } from 'util/token';

const LogOutRedirect = props => {
  if (props.location.pathname && props.location.pathname.indexOf('/kiosk') > -1)
    return null;

  if (props.token && !props.token.payload && !getCachedToken()) {
    return <Redirect to="/login" />;
  } else {
    return null;
  }
};

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTokenReset: () => {
      dispatch(tokenReset());
    },
  };
};

export default connect(
  LogOutRedirect,
  mapStateToProps,
  mapDispatchToProps
);
