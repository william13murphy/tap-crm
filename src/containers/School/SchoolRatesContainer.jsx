import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolRatesFetch,
  schoolRatesResetState,
} from 'src/redux/actionCreators/school/rates';

const payloadDisplayName = 'School Rates';

class SchoolRatesContainer extends React.Component {
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
    data: state.school.rates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolRatesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolRatesResetState());
    },
  };
};

export default connect(
  SchoolRatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
