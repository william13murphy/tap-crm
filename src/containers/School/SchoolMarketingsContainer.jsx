import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolMarketingsFetch,
  schoolMartetingsResetState,
} from 'src/redux/actionCreators/school/marketings';

const payloadDisplayName = 'School Marketings';

class SchoolMarketingsContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
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
    data: state.school.marketings,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolMarketingsFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolMartetingsResetState());
    },
  };
};

export default connect(
  SchoolMarketingsContainer,
  mapStateToProps,
  mapDispatchToProps
);
