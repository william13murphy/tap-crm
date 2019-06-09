import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolAccountSummaryFetch,
  schoolAccountSummaryResetState,
} from 'src/redux/actionCreators/school/accountSummary';

const payloadDisplayName = 'Account Summary';

class SchoolAccountSummaryContainer extends React.Component {
  props: {
    id: string,
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchReset: any,
    options?: {},
  };
  render() {
    return (
      <GenericFetchContainer
        alwaysFetch={true}
        payloadDisplayName={payloadDisplayName}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.school.accountSummary,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: data => {
      dispatch(schoolAccountSummaryFetch(data));
    },
    dispatchResetState: () => {
      dispatch(schoolAccountSummaryResetState());
    },
  };
};

export default connect(
  SchoolAccountSummaryContainer,
  mapStateToProps,
  mapDispatchToProps
);
