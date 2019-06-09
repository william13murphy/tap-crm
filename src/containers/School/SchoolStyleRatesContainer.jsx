import React from 'react';
import connect from 'src/redux/connect';
import GenericFetchContainer from '../GenericFetchContainer';
import {
  schoolStyleRatesFetch,
  schoolStyleRatesResetState,
} from 'src/redux/actionCreators/school/styleRates';

const payloadDisplayName = 'Program Rates';

class SchoolStyleRatesContainer extends React.Component {
  props: {
    children: any,
    data: Array<{}> | {} | null,
    dispatchFetch: any,
    dispatchFetchParams: string,
    dispatchActionOnClose: any,
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
    data: state.school.styleRates,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetch: id => {
      dispatch(schoolStyleRatesFetch(id));
    },
    dispatchResetState: () => {
      dispatch(schoolStyleRatesResetState());
    },
  };
};

export default connect(
  SchoolStyleRatesContainer,
  mapStateToProps,
  mapDispatchToProps
);
