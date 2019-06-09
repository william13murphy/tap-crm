import React from 'react';
import connect from 'src/redux/connect';
import { tokenReset } from 'src/redux/actionCreators/token';
import { resetCachedTokens } from 'util/token';

type LogOutButtonWrapperProps = {
  children: React.Element<any>,
  token: {
    payload: {} | null,
  },
  dispatchTokenReset: any,
};

class LogOutButtonWrapper extends React.Component {
  props: LogOutButtonWrapperProps;
  handleClick = () => {
    // Reset cached token:
    resetCachedTokens();
    // Reset token stored in redux:
    this.props.dispatchTokenReset();
  };
  render() {
    return (
      <div className="LogOutButtonWrapper" onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

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
  LogOutButtonWrapper,
  mapStateToProps,
  mapDispatchToProps
);
