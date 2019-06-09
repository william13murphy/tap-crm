import React from 'react';
import connect from 'src/redux/connect';
import GenericReportFormContainer from 'containers/GenericReportFormContainer';

import {
  nonEfcUsersSearch,
  nonEfcUsersReset,
} from 'src/redux/actionCreators/administration/nonEfcUsersSearch';

const payloadDisplayName = 'Search All';
const formPostAction = nonEfcUsersSearch;
const formResetAction = nonEfcUsersReset;

type NonEfcUsersSearchContainerProps = {
  children: any,
  data: Array<{}> | {} | null,
  dispatchFetch: any,
  dispatchFetchParams: string,
  dispatchActionOnClose: any,
  redirectOnSuccess: any,
  options?: {},
};

class NonEfcUsersSearchContainer extends React.Component {
  props: NonEfcUsersSearchContainerProps;
  render() {
    return (
      <GenericReportFormContainer
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.administration.nonEfcUsersSearch,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFormPost: data => {
      dispatch(formPostAction(data));
    },
    dispatchFormReset: () => {
      dispatch(formResetAction());
    },
  };
};

export default connect(
  NonEfcUsersSearchContainer,
  mapStateToProps,
  mapDispatchToProps
);
