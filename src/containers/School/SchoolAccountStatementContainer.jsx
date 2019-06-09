import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolAccountStatementFetch,
  schoolAccountStatementResetState,
} from 'src/redux/actionCreators/school/accountStatement';

const payloadDisplayName = 'Account Statement';

class SchoolAccountStatementContainer extends React.Component {
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
    data: state.school.accountStatement,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: data => {
      dispatch(schoolAccountStatementFetch(data));
    },
    dispatchResetState: () => {
      dispatch(schoolAccountStatementResetState());
    },
  };
};

export default connect(
  SchoolAccountStatementContainer,
  mapStateToProps,
  mapDispatchToProps
);
